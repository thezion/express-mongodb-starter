import express from 'express';
import createJson from '../libraries/createJson';
import HttpError from '../classes/HttpError.class';
import { signInWithPassword } from '../repositories/user.repository';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = await signInWithPassword(req.body.email, req.body.password);
        if (user) {
            const data = {
                ...user.getBasicFields(),
                token: user.getJwt(),
            };
            res.send(createJson(data));
            return;
        }
    } catch (err) {
        next(err);
    }

    next(new HttpError('Wrong Password / User Does Not Exist.', 400));
});

export default router;
