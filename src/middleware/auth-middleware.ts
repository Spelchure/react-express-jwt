import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.get('Authorization')?.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, <string>process.env.APP_SECRET);
    if (!decodedToken) {
      return res.status(401).json({message: 'Unauthorized.'});
    }
    req.userEmail = (decodedToken as JwtPayload).email;
  } catch (err) {
    return res
      .status(401)
      .json({message: 'Unauthorized', error: (err as Error).message});
  }
  return next();
};

export default authMiddleware;
