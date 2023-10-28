import express from 'express';
import userRoutes from './routes/userRoutes';
import setupBodyParser from './middlewares/bodyParser';
import logger from '../main/logger';
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = 4000;

setupBodyParser(app);

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from Electron + Express!' });
});

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
