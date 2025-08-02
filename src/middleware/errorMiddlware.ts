import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = err.message || 'Something went wrong';
  console.error('error : ' + message);
  res.status(400).json({ error: message });
};

export default errorHandler;
