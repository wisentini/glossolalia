import { KeywordRepository } from '../repository/keyword.repository';
import { Controller } from './controller';

export class KeywordController extends Controller {
  constructor() {
    super(new KeywordRepository());
  }

  createNodes(data, key) {
    return this._repository.createNodes(data, key);
  }

  createEdges(data, key) {
    return this._repository.createEdges(data, key);
  }
}
