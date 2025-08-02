import express from 'express';
import {
  addContact,
  deleteContact,
  searchContact,
  modifyContact,
} from '../controllers/contactController';
import {
  idValidator,
  nameValidator,
  phoneValidator,
  emailValidator,
  adressValidator,
  notesValidator,
  validate,
} from '../middleware/validateMiddleware';

const router = express.Router();

router.get('/contact', searchContact);
router.post(
  '/contact',
  [
    nameValidator,
    phoneValidator,
    emailValidator,
    adressValidator,
    notesValidator,
    validate,
  ],
  addContact
);
router.delete('/contact', [idValidator, validate], deleteContact);
router.put(
  '/contact',
  [
    nameValidator,
    phoneValidator,
    emailValidator,
    adressValidator,
    notesValidator,
    idValidator,
    validate,
  ],
  modifyContact
);

export default router;
