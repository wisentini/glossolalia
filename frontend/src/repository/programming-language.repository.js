import { DataSet } from 'vis-data/peer/esm/vis-data';
import { isEmpty, isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import { Repository } from './repository';

export class ProgrammingLanguageRepository extends Repository {
  constructor() {
    super('programming-languages');
  }

  createNodes(data, key) {
    return new DataSet(
      this._filterByKey(data, key)
        .map(x => {
          const a = this._getColor(x.id);
          const b = tinycolor(a);

          return {
            id: x.id,
            label: x.name,
            color: a,
            font: {
              color: b.isDark() ? '#FFFFFF' : '#000000'
            }
          }
        })
    );
  }

  createInfluencedEdges(data, key) {
    const a = this._filterByKey(data, key);
    const b = a.filter(x => !isNil(x.influenced));
    const set = [];

    b.forEach(x => {
      x.influenced.forEach(y => {
        const [c] = this._filterByKeyAndPredicate(data, 'id', (z => z.name === y));

        if (!isEmpty(c) && !isNil(c)) {
          set.push({
            from: x.id,
            to: c.id,
            arrows: 'to'
          });
        }
      });
    });

    return new DataSet(set);
  }

  createInfluencedByEdges(data, key) {
    const a = this._filterByKey(data, key);
    const b = a.filter(x => !isNil(x.influenced_by));
    const set = [];

    console.log(b);

    b.forEach(x => {
      x.influenced_by.forEach(y => {
        const [c] = this._filterByKeyAndPredicate(data, 'id', (z => z.name === y));

        if (!isEmpty(c) && !isNil(c)) {
          set.push({
            from: x.id,
            to: c.id,
            arrows: 'from'
          });
        }
      });
    });

    return new DataSet(set);
  }

  createItems(data) {
    return new DataSet(
      data
        .map((item, index) => ({
          id: index,
          content: item.name,
          start: new Date(item.first_appeared, 0)
        }))
    );
  }
}
