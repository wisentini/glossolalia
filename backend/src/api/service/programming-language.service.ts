import { getCustomRepository } from 'typeorm';
import { ProgrammingLanguage } from '../entity/programming-language.entity';
import { ProgrammingLanguageRepository } from '../repository/programming-language.repository';

export class ProgrammingLanguageService {
  public async find(query: any): Promise<ProgrammingLanguage[] | Error> {
    const repository = getCustomRepository(ProgrammingLanguageRepository);
    const programmingLanguages = await repository.findByQuery(query);
    return programmingLanguages;
  }
};
