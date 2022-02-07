import { EntityRepository, Repository } from 'typeorm';
import { isEmpty, pick, isEqual } from 'lodash';
import { Keyword } from '../entity/keyword.entity';
import { ParserUtil } from './util/parser.util';

@EntityRepository(Keyword)
export class KeywordRepository extends Repository<Keyword> {
  validAttributes = [
    'column', 'id', 'programming_language_id', 'name'
  ];

  public async findByQuery(query: any): Promise<Keyword[] | Error> {
    const parsedQuery = ParserUtil.parseQuery(query, this.validAttributes);
    const chosenColumns: string[] | null = ParserUtil.parseColumns(parsedQuery, this.validAttributes);
    let finalResult: Keyword[] = await this.query(`SELECT kw.* FROM keyword AS kw;`);

    await Object.entries(parsedQuery).reduce(async (promise, entry, currentIndex) => {
      await promise;

      const [key, value]: [key: string, value: any] = entry;
      let partialResult = [];

      if (isEqual(key, 'id') || isEqual(key, 'programming_language_id') || isEqual(key, 'name')) {
        partialResult = await this.query(`
          SELECT kw.*
          FROM keyword kw
          WHERE kw.${key} IN (${value.map(v => `'${v}'`)})
        `);
      }

      if (isEmpty(partialResult)) {
        finalResult = [];
        return;
      } else {
        finalResult = (currentIndex == 0) ? partialResult : finalResult.filter(x => partialResult.some(y => isEqual(x.id, y.id)));
      }
    }, Promise.resolve());

    return chosenColumns ? finalResult.map(res => pick(res, chosenColumns) as any) : finalResult;
  }
};
