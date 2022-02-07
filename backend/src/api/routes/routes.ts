import { Router } from 'express';
import { ProgrammingLanguageController } from '../controller/programming-language.controller';
import { KeywordController } from '../controller/keyword.controller';

const routes = Router();

routes.get(
  '/programming-languages/',
  new ProgrammingLanguageController().handleRequest
);

routes.get(
  '/keywords/',
  new KeywordController().handleRequest
);

export { routes };
