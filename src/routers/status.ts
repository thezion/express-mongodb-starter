import os from 'os';
import express from 'express';
import mongoose from 'mongoose';
import createJson from '../libraries/createJson';

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
    res.send(createJson(data));
});

export default router;
