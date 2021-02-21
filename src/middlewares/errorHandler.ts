import { Request, Response, NextFunction } from 'express';
import createJson from '../libraries/createJson';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const jsonObj = createJson(null, err);
    res.status(jsonObj.error ? jsonObj.error.code : 200).send(jsonObj);
}
