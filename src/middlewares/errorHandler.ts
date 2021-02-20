import { Request, Response, NextFunction } from 'express';
import JsonRes from '../classes/JsonRes.class';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const jsonObj = new JsonRes(null, err);
    res.status(jsonObj.error ? jsonObj.error.code : 200).send(jsonObj);
}
