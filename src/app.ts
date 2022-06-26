import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as routes from 'routes';

export default function createServer() {
  const app = express();

  app.use(cors());

  app.use(bodyParser.json());

  app.use('/api/auth', routes.authRoutes);
  app.use('/api/protected', routes.protectedRoutes);

  /* Error handler */
  // eslint-disable-next-line
  app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
    return res.status(500).json({message: 'FAIL', error: error.message});
  });
  return app;
}
