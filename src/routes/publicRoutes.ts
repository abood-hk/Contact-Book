import express from 'express';
import { getFile, mainPage } from '../controllers/publicController';

const router = express.Router();

router.get('/', mainPage);
router.get('/:foldername/:filename.:type', getFile);

export default router;
