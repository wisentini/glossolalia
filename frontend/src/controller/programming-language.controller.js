import { ProgrammingLanguageRepository } from '../repository/programming-language.repository';
import { Controller } from './controller';

export class ProgrammingLanguageController extends Controller {
  constructor() {
    super(new ProgrammingLanguageRepository());
  }

  createNodes(data, key) {
    return this._repository.createNodes(data, key);
  }

  createInfluencedEdges(data, key) {
    return this._repository.createInfluencedEdges(data, key);
  }

  createInfluencedByEdges(data, key) {
    return this._repository.createInfluencedByEdges(data, key);
  }

  createItems(data) {
    return this._repository.createItems(data);
  }
}
