import express from 'express';
import { getFile } from '../controllers/publicController';

const router = express.Router();
router.get('/:foldername/:filename.:type', getFile);

export default router;
