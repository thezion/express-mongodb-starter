import express from 'express';
import * as controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);

export default router;
