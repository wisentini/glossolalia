import { request } from '../api/request/request';
import { pick } from "lodash";

export class Repository {
  #endpoint;

  constructor(endpoint) {
    if (this.constructor === Repository) {
      throw new Error("Abstract classes can't be instantiated.");
    } else {
      this.#endpoint = endpoint;
    }
  }

  async getAll() {
    return await request.getAll(this.#endpoint);
  }

  async getByQuery(query) {
    return await request.getByQuery(this.#endpoint, this.#encodeQuery(query));
  }

  #encodeQuery(obj) {
    return Object
      .entries(obj)
      .map(([key, val]) =>
        `${key}=${val
          .split(',')
          .map(v => encodeURIComponent(v))
          .join(',')}`)
      .join('&');
  }

  _getRandomColor() {
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  }

  _filterByKey = (data, key) => {
    return data.map(x => pick(x, key));
  };

  _filterByKeyAndPredicate = (data, key, predicate) => {
    return this._filterByKey(data.filter(x => predicate(x)), key);
  };
}
