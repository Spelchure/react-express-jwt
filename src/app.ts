import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';

export default function createServer() {
  const app = express();

  app.use(cors());

  app.use('/', (_: Request, res: Response) => {
    res.status(200).json({message: 'Success'});
  });

  /* Error handler */
  // eslint-disable-next-line
  app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
    return res.status(500).json({error: error.message});
  });
  return app;
}
