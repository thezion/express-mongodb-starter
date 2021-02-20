import os from 'os';
import express from 'express';
import JsonRes from '../classes/JsonRes.class';

const router = express.Router();
router.get('/', (req, res) => {
    const data = {
        ip: req.socket.remoteAddress,
        hostname: os.hostname(),
        pid: process.pid,
        time: new Date().toISOString(),
    };
    res.send(new JsonRes(data));
});

export default router;
