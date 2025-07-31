import express from 'express';
import {
  addContact,
  deleteContact,
  searchContact,
  modifyContact,
} from '../controllers/contactController';

const router = express.Router();

router.get('/contact', searchContact);
router.post('/contact', addContact);
router.delete('/contact', deleteContact);
router.put('/contact', modifyContact);

export default router;
