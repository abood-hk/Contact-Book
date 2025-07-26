import express from 'express';
import { addContact } from '../controllers/contactController';

const router = express.Router();

router.post('/contact', addContact);

export default router;
