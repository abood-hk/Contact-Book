import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Mongodb url is not in .env');
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('mongodb is connected'))
  .catch((err) => console.log('Failed to connect mongodb: ' + err.message));
