declare namespace Express {
    // adding user field in Request
    export interface Request {
        user?: object;
    }
}
