import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import HttpError from '../classes/HttpError.class';

const error401 = new HttpError('Unauthorized', 401);
const error403 = new HttpError('Forbidden - Failed To Verify Token', 403);

export default function verifyJwt(req: Request, res: Response, next: NextFunction): void {
    // Gather the jwt access token from the request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const secert = process.env.JWT_SECRET || '';

    if (token && secert) {
        jsonwebtoken.verify(token, secert, (err, decoded) => {
            if (err) {
                next(error403);
            } else {
                (req as any).user = decoded;
                next();
            }
        });
    } else {
        next(error401);
    }
}
