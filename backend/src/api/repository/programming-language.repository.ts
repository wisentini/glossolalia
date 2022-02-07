import { EntityRepository, Repository } from 'typeorm';
import { isEmpty, pick, isEqual } from 'lodash';
import { ProgrammingLanguage } from '../entity/programming-language.entity';
import { ParserUtil } from './util/parser.util';

@EntityRepository(ProgrammingLanguage)
export class ProgrammingLanguageRepository extends Repository<ProgrammingLanguage> {
  validAttributes = [
    'column', 'id', 'name', 'first_appeared', 'paradigm', 'designed_by',
    'typing_discipline', 'influenced_by', 'influenced',
    'website_url', 'source_url', 'filename_extension'
  ];

  public async findByQuery(query: any): Promise<ProgrammingLanguage[] | Error> {
    const parsedQuery = ParserUtil.parseQuery(query, this.validAttributes);
    const chosenColumns: string[] | null = ParserUtil.parseColumns(parsedQuery, this.validAttributes);
    let finalResult: ProgrammingLanguage[] = await this.query(`SELECT pl.* FROM programming_language AS pl;`);

    await Object.entries(parsedQuery).reduce(async (promise, entry, currentIndex) => {
      await promise;

      const [key, value]: [key: string, value: any] = entry;
      let partialResult = [];

      if (isEqual(key, 'id') || isEqual(key, 'name') || isEqual(key, 'first_appeared')) {
        partialResult = await this.query(`
          SELECT *
          FROM (
            SELECT pl.*, array_agg(${key}) over () as all_names
            FROM programming_language AS pl
            WHERE ${key} IN (${value.map(v => `'${v}'`)})
          ) t
          WHERE CARDINALITY(all_names) = ${value.length};
        `);
      } else {
        const values = value.map(v => `%${v}%`);

        partialResult = await this.query(`
          SELECT pl.*
          FROM programming_language AS pl
          WHERE NOT EXISTS (
            SELECT 
            FROM unnest('{${values}}'::varchar[]) AS p(pattern)
            WHERE NOT EXISTS (
              SELECT
              FROM unnest(pl.${key}) AS a(elem)
              WHERE a.elem LIKE p.pattern
            )
          );
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
