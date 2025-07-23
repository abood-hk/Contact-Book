import { Request, Response } from 'express';
import path from 'path';

export const getFile = (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', req.url));
};
