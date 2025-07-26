import express from 'express';
import dotenv from 'dotenv';
import './config/db';
import contactRouter from './routes/contactRoutes';
import path from 'path';
import logger from './middleware/loggerMiddleware';
import publicRouter from './routes/publicRoutes';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('There is no port variable in .env');
}

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(logger);
app.use('/api', contactRouter);
app.use('/public', publicRouter);

app.listen(PORT, () => console.log('Server is running'));
