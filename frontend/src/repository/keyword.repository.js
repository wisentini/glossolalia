import { DataSet } from 'vis-data/peer/esm/vis-data';
import { isEmpty, isNil } from 'lodash';

import { Repository } from './repository';

export class KeywordRepository extends Repository {
  constructor() {
    super('keywords');
  }

  createNodes(data, key) {
    return new DataSet(
      this._filterByKey(data, key)
        .map(x => ({
          id: x.id,
          label: x.name,
          color: this._getRandomColor()
        }))
    );
  }

  createEdges(data, key) {
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
}
