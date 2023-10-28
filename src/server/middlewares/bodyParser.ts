import { Express } from 'express';
import bodyParser from 'body-parser';

const setupBodyParser = (app: Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default setupBodyParser;
