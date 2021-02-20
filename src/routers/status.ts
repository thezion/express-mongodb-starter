import os from 'os';
import express from 'express';
import mongoose from 'mongoose';
import JsonRes from '../classes/JsonRes.class';

const router = express.Router();
router.get('/', (req, res) => {
    const data = {
        ip: req.socket.remoteAddress,
        hostname: os.hostname(),
        pid: process.pid,
        time: new Date().toISOString(),
        database: {
            readyState: mongoose.connection.readyState,
        },
    };
    res.send(new JsonRes(data));
});

export default router;
