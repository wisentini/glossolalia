import { isNil, mapValues, omitBy, pick } from 'lodash';

export class ParserUtil {
  public static parseQuery(query: any, validAttributes: string[]) {
    // extract only valid keys from query
    const a = pick(query, validAttributes);
    
    // remove null-valued keys
    const b = omitBy(a, isNil);

    // convert each value to an array of strings
    const c = mapValues(b, d => (d as string).split(','));
    return c;
  }

  public static parseColumns(query: any, validAttributes: string[]): string[] | null {
    let areColumnsValid: boolean = false;

    if (query.column) {
      areColumnsValid = query.column.every(col => {
        return validAttributes.includes(col);
      });
    }

    const columns: string[] = query.column;
    delete query.column;

    return areColumnsValid ? columns : null;
  };
};
