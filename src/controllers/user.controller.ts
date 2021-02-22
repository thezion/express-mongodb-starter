import { Request, Response, NextFunction } from 'express';
import createJson from '../libraries/createJson';
import HttpError from '../classes/HttpError.class';
import * as repo from '../repositories/user.repository';

export async function getList(req: Request, res: Response) {
    const user = await repo.getUserList();
    const data = user.map((one) => one.getBasicFields());
    res.send(createJson(data));
}

export async function getById(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await repo.getUserById(userId);
    if (user) {
        const data = user.getBasicFields();
        res.send(createJson(data));
    } else {
        throw new HttpError(`User ${userId} Not Found`, 404);
    }
}
