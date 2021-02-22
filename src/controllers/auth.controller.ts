import { Request, Response, NextFunction } from 'express';
import createJson from '../libraries/createJson';
import HttpError from '../classes/HttpError.class';
import * as repo from '../repositories/user.repository';
import { UserDocument } from '../models/User.model';

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await repo.signInWithPassword(email, password);
    if (user) {
        res.send(createJson(transformUser(user)));
    } else {
        throw new HttpError('Password Does Not Match / User Does Not Exist', 400);
    }
}

export async function signUp(req: Request, res: Response) {
    const email = req.body.email.trim();
    const existingUser = await repo.getUserByEmail(email);
    if (existingUser) {
        throw new HttpError('Email has been registered', 400);
    }
    // create a new user
    const currentDate = new Date();
    const newUser = await repo.create({
        email: req.body.email,
        password: req.body.password,
        username: (req.body.username || '').trim(),
        ip: req.socket.remoteAddress || '',
        createdAt: currentDate,
        lastLogin: currentDate,
    });
    res.send(createJson(transformUser(newUser)));
}

/* === helper functions below === */

function transformUser(user: UserDocument) {
    return {
        ...user.getBasicFields(),
        token: user.getJwt(),
    };
}
