import * as express from 'express';
import * as authController from '../auth/auth-controller';
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
export default router;
