import { Request, Response } from 'express';
import contactModel, { IContact } from '../models/Contact';

let allContacts: IContact[];

const getContacts = async () => {
  try {
    allContacts = await contactModel.find();
  } catch (err) {
    if (err instanceof Error)
      throw new Error('Failed to get contacts from mongodb :' + err.message);
    throw Error('Unknown error');
  }
};
getContacts();

export const getAllContacts = (req: Request, res: Response) => {
  res.status(200).render('home', { contacts: allContacts });
};
