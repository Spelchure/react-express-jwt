import {Router} from 'express';
import {authControllers} from 'controllers';
import {userCredentialsValidator} from 'middleware/validation-middleware';

const router = Router();

router.post(
  '/signup',
  ...userCredentialsValidator,
  authControllers.postAuthSignup
);
router.post(
  '/login',
  ...userCredentialsValidator,
  authControllers.postAuthLogin
);

export default router;
