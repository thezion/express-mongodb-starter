import express from 'express';
import verifyJwt from '../middlewares/verifyJwt';

// import all routers here
import status from './status';
import auth from './auth';
import users from './users';

const router = express.Router();

router.use('/', status);
router.use('/auth', auth);
router.use('/users', verifyJwt, users);

export default router;
