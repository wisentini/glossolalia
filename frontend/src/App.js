import React, { useState, useEffect } from 'react';

import { ProgrammingLanguageController } from './controller/programming-language.controller';
import { KeywordController } from './controller/keyword.controller';

import { NetworkGraph } from './component/NetworkGraph/NetworkGraph';
import { TimelineGraph } from './component/TimelineGraph/TimelineGraph';
import { Header } from './component/Header/Header';
import { Menu } from './component/Menu/Menu';
import { Loading } from './component/Loading/Loading';

import style from './style.module.css';

export const App = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);

  const defaultRelation = 'influenced';
  const [relation, setRelation] = useState(defaultRelation);

  const [isLoading, setIsLoading] = useState(true);

  const plController = new ProgrammingLanguageController();
  const kwController = new KeywordController();

  useEffect(() => {
    plController
      .getAll()
      .then(response => {
        setProgrammingLanguages(response);

        setData({
          nodes: plController.createNodes(response, ['id', 'name']),
          edges: plController.createInfluencedEdges(response, ['id', 'influenced'])
        });
        
        setIsLoading(false);
      });
  }, []);

  const handleMenuChange = (value) => {
    setIsLoading(true);
    setRelation(value);

    switch (value) {
      case 'influenced':
        setData({
          nodes: plController.createNodes(programmingLanguages, ['id', 'name']),
          edges: plController.createInfluencedEdges(programmingLanguages, ['id', 'influenced'])
        });
        break;
      case 'influencedBy':
        setData({
          nodes: plController.createNodes(programmingLanguages, ['id', 'name']),
          edges: plController.createInfluencedByEdges(programmingLanguages, ['id', 'influenced_by'])
        });
        break;
      case 'timeline':
        setItems(plController.createItems(programmingLanguages));
        break;
      default:
        break;
    }

    setIsLoading(false);
  };

  return (
    <div className={style.container}>
      <div className={style.topContainer}>
        <Header />
        <Menu
          defaultRelation={defaultRelation}
          handleMenuChange={handleMenuChange}
        />
      </div>
      <div className={style.main}>
        {
          (relation === 'timeline')
            ?
            (
              isLoading ? <Loading /> : <TimelineGraph items={items}/>
            )
            :
            (
              isLoading ? <Loading /> : <NetworkGraph data={data} relation={relation}/>
            )
        }
      </div>
    </div>
  );
};
