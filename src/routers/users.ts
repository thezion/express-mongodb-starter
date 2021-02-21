import express from 'express';
import { getList, getById } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getList);

router.get('/:userId', getById);

export default router;
