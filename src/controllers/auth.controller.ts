import { Request, Response, NextFunction } from 'express';
import createJson from '../libraries/createJson';
import HttpError from '../classes/HttpError.class';
import * as repo from '../repositories/user.repository';

export async function signIn(req: Request, res: Response, next: NextFunction) {
    const user = await repo.signInWithPassword(req.body.email, req.body.password);
    if (user) {
        const data = {
            ...user.getBasicFields(),
            token: user.getJwt(),
        };
        res.send(createJson(data));
    } else {
        next(new HttpError('Password Does Not Match / User Does Not Exist', 400));
    }
}
