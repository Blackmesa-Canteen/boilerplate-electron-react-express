import { Express } from 'express';
import bodyParser from 'body-parser';

/**
 * Request body parser middleware
 * @param app
 * @returns void
 * @author 996Worker
 */
const setupBodyParser = (app: Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default setupBodyParser;
