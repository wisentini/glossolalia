import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { Keyword } from '../entity/keyword.entity';
import { KeywordService } from '../service/keyword.service';

export class KeywordController {
  async handleRequest(request: Request, response: Response) {
    const service = new KeywordService();
    const query = request.query;

    let keywords: Keyword[] | Error = (isEmpty(query)) ? await service.find({}) : await service.find(query);

    if (keywords instanceof Error) {
      return response.status(400).json(keywords.message);
    } else {
      return response.json(keywords);
    }
  }
};
