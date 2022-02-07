import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { ProgrammingLanguage } from '../entity/programming-language.entity';
import { ProgrammingLanguageService } from '../service/programming-language.service';

export class ProgrammingLanguageController {
  async handleRequest(request: Request, response: Response) {
    const service = new ProgrammingLanguageService();
    const query = request.query;
    let programmingLanguages: ProgrammingLanguage[] | Error = (isEmpty(query)) ? await service.find({}) : await service.find(query);

    if (programmingLanguages instanceof Error) {
      return response.status(400).json(programmingLanguages.message);
    } else {
      return response.json(programmingLanguages);
    }
  }
};
