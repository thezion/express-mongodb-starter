import express from 'express';
import * as controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/', controller.signIn);

export default router;
