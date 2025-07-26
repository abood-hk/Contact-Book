import { Request, Response } from 'express';
import path from 'path';
import { getAllContacts } from './contactController';

export const mainPage = (req: Request, res: Response) => {
  getAllContacts(req, res);
};
export const getFile = (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', req.url));
};
