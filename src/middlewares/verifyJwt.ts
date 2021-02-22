import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import HttpError from '../classes/HttpError.class';

const error401 = new HttpError('Unauthorized', 401);

export default function verifyJwt(req: Request, res: Response, next: NextFunction): void {
    // Gather the JWT from the request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const secert = process.env.JWT_SECRET || '';

    if (token && secert) {
        jsonwebtoken.verify(token, secert, (err, decoded) => {
            if (err) {
                throw error401;
            } else {
                (req as any).user = decoded;
                next();
            }
        });
    } else {
        throw error401;
    }
}
