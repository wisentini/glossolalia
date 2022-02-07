import React, { useState, useEffect } from 'react';

import { ProgrammingLanguageController } from './controller/programming-language.controller';
import { KeywordController } from './controller/keyword.controller';

import { Graph } from './component/Graph/Graph';

export const App = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const [data, setData] = useState({
    programmingLanguages: {
      nodes: null,
      edges: null,
    },
    keywords: {
      nodes: null,
      edges: null
    }
  });

  const plController = new ProgrammingLanguageController();
  const kwController = new KeywordController();

  useEffect(() => {
    plController
      .getAll()
      .then(response => {
        setProgrammingLanguages(response);
        
        setData({
          ...data,
          programmingLanguages: {
            nodes: plController.createNodes(response, ['id', 'name']),
            edges: plController.createEdges(response, ['id', 'influenced'])
          }
        })
      });
  }, []);

  const options = {
    nodes: {
      shape: "ellipse",
      size: 16
    },
    interaction: {
      selectConnectedEdges: true
    }
  };

  return (
    <div>
      {/*
        nodes && edges &&
        <Graph
          nodes={nodes}
          edges={edges}
          options={options}
        />*/
      }
      <Graph
        nodes={data.programmingLanguages.nodes}
        edges={data.programmingLanguages.edges}
        options={options}
      />
    </div>
  );
};
