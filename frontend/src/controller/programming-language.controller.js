import { ProgrammingLanguageRepository } from '../repository/programming-language.repository';
import { Controller } from './controller';

export class ProgrammingLanguageController extends Controller {
  constructor() {
    super(new ProgrammingLanguageRepository());
  }

  createNodes(data, key) {
    return this._repository.createNodes(data, key);
  }

  createEdges(data, key) {
    return this._repository.createEdges(data, key);
  }
}
