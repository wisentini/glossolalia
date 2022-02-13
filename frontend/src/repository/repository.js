import { request } from '../api/request/request';
import { pick } from "lodash";

import { colors } from '../config/colors';

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

  #arrayHasIndex(array, index) {
    return Array.isArray(array) && array.hasOwnProperty(index);
  }

  _getColor(index) {
    if (!this.#arrayHasIndex(colors, index)) {
      index = Math.floor(Math.random() * colors.length);
    }

    return colors[index];
  }

  _filterByKey = (data, key) => {
    return data.map(x => pick(x, key));
  };

  _filterByKeyAndPredicate = (data, key, predicate) => {
    return this._filterByKey(data.filter(x => predicate(x)), key);
  };
}
