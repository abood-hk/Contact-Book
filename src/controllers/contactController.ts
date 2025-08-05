import { Request, Response } from 'express';
import contactModel from '../models/Contact';
import mongoose from 'mongoose';

interface InewContact {
  name: string;
  phone: string;
  email?: string;
  adress?: string;
  notes?: string;
}

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const allContacts = await contactModel.find();
    res.status(200).render('home', { contacts: allContacts || [] });
  } catch (err) {
    if (err instanceof Error)
      throw new Error('Failed to get contacts from mongodb :' + err.message);
    throw Error('Unknown error');
  }
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
    const newContact = await contactModel.create(contactEntry);
    if (req.headers.accept?.includes('application/json')) {
      return res.status(201).json(newContact);
    }
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

export const deleteContact = async (req: Request, res: Response) => {
  const id = mongoose.Types.ObjectId.createFromHexString(req.body.id);
  const user = await contactModel.findById(id);
  if (!user) return res.status(400).json('No user with this id');
  await contactModel.deleteOne({ _id: id });
  res.status(200).json(req.body.id);
};

export const searchContact = async (req: Request, res: Response) => {
  function escapeRegex(input: string): string {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  const rawName = Array.isArray(req.query.name)
    ? (req.query.name[0] as string)
    : (req.query.name as string) || '';
  const name = escapeRegex(rawName);
  const filteredContacts = await contactModel.find({
    name: { $regex: new RegExp(name, 'i') },
  });
  res.status(200).json(filteredContacts || '');
};

export const modifyContact = async (req: Request, res: Response) => {
  const id = mongoose.Types.ObjectId.createFromHexString(req.body.id);
  const user = await contactModel.findById(id);
  if (!user) return res.status(400).json('No user with this id');
  const {
    name = '',
    phone = '',
    email = '',
    adress = '',
    notes = '',
  } = req.body || '';
  await contactModel.updateOne(
    { _id: id },
    { $set: { name, phone, email, adress, notes } }
  );
  const newUser = await contactModel.findById(id);
  if (!newUser) return res.status(400).json('No user with this id');
  const newContact = await contactModel.findOne({ _id: id });
  res.status(200).json(newContact);
};
