import express from 'express';

// import all routers here
import status from './status';

const router = express.Router();

router.use('/status', status);

export default router;
