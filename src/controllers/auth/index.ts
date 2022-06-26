import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import User from 'models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const postAuthSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email as string;
  let password = req.body.password as string;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({message: 'FAIL', errors: errors.array()});
  }

  try {
    // Hash password
    password = await bcrypt.hash(password, 12);

    // Create new user in db.
    await new User({email, password}).save();
  } catch (error) {
    return next(new Error((error as Error).message));
  }

  res.status(201).json({message: 'SUCCESS'});
};

export const postAuthLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email as string;
  const password = req.body.password as string;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({message: 'FAIL', errors: errors.array()});
  }

  try {
    // Check if user exists.
    const user = await User.findOne({email});
    if (user === null) {
      return res.status(401).json({message: 'FAIL', error: 'User not found.'});
    }
    // Compare password.
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      return res
        .status(401)
        .json({message: 'FAIL', error: 'Invalid password.'});
    }
    // Generate token and send it.
    const token = jwt.sign({email}, <string>process.env.APP_SECRET, {
      expiresIn: '24h',
    });
    return res.status(200).json({
      message: 'SUCCESS',
      token,
    });
  } catch (error) {
    return next(new Error((error as Error).message));
  }
};
