import {body} from 'express-validator';

export const userCredentialsValidator = [
  body('email').isEmail(),
  body('password').isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
  }),
];
