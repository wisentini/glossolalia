export class Controller {
  _repository;

  constructor(repository) {
    if (this.constructor === Controller) {
      throw new Error("Abstract classes can't be instantiated.");
    } else {
      this._repository = repository;
    }
  }

  async getAll() {
    return await this._repository.getAll();
  }

  async getByQuery(query) {
    return await this._repository.getByQuery(query);
  }
}
