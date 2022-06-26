import {protectedControllers} from 'controllers';
import {Router} from 'express';
import authMiddleware from 'middleware/auth-middleware';

const router = Router();

router.get('/', authMiddleware, protectedControllers.getProtected);

export default router;
