import { Request, Response } from 'express';
import contactModel, { IContact } from '../models/Contact';

interface InewContact {
  name: string;
  phone: string;
  email?: string;
  adress?: string;
  notes?: string;
}

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

export const getAllContacts = async (req: Request, res: Response) => {
  await getContacts();
  res.status(200).render('home', { contacts: allContacts || [] });
};

export const addContact = async (req: Request, res: Response) => {
  try {
    const contactEntry: InewContact = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      adress: req.body.adress,
      notes: req.body.notes,
    };
    await contactModel.create(contactEntry);
    getAllContacts(req, res);
  } catch (err) {
    if (err instanceof Error) {
      console.log(
        'Something prevented the addtion of the new entry : ' + err.message
      );
    } else {
      console.log('Something went wrong');
    }
  }
};
