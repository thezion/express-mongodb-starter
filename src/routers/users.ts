import express from 'express';
import * as controller from '../controllers/user.controller';

const router = express.Router();

router.get('/', controller.getList);

router.get('/:userId', controller.getById);

export default router;
