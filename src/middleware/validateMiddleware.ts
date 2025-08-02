import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export const idValidator = body('id')
  .custom((value) => mongoose.Types.ObjectId.isValid(value))
  .withMessage('Invalid ID');

export const nameValidator = body('name')
  .trim()
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ max: 40 })
  .escape()
  .withMessage('The name is too long');

export const phoneValidator = body('phone')
  .trim()
  .notEmpty()
  .isLength({ min: 10, max: 10 })
  .withMessage('Number must be 10 degits')
  .escape()
  .isNumeric()
  .withMessage('Phone number must only contain numbers');

export const emailValidator = body('email')
  .trim()
  .notEmpty()
  .optional()
  .isEmail()
  .withMessage('The email is invalid');

export const adressValidator = body('adress')
  .trim()
  .notEmpty()
  .escape()
  .optional()
  .isLength({ max: 100 })
  .withMessage('The adress is too long');

export const notesValidator = body('notes')
  .trim()
  .notEmpty()
  .escape()
  .optional()
  .isLength({ max: 250 })
  .withMessage('The note is too long');

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
