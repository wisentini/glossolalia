import { getCustomRepository } from 'typeorm';
import { Keyword } from '../entity/keyword.entity';
import { KeywordRepository } from '../repository/keyword.repository';

export class KeywordService {
  public async find(query: any): Promise<Keyword[] | Error> {
    const repository = getCustomRepository(KeywordRepository);
    const keywords = await repository.findByQuery(query);
    return keywords;
  }
};
