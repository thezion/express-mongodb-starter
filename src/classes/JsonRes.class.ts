import HttpError from '../classes/HttpError.class';

export default class JsonRes {
    data: any;
    error: { code: number; message: string } | null = null;

    constructor(data: any = null, error: Error | null = null) {
        this.data = data;
        if (error) {
            const code = error instanceof HttpError ? error.errorCode : 500;
            this.error = {
                code,
                message: error.message,
            };
        }
    }
}
