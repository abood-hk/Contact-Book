import express from 'express';
import { addContact, deleteContact } from '../controllers/contactController';

const router = express.Router();

router.post('/contact', addContact);
router.delete('/contact', deleteContact);

export default router;
