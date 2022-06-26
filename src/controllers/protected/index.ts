import {Request, Response} from 'express';

export const getProtected = (req: Request, res: Response) => {
  return res.status(200).json({email: req.userEmail});
};
