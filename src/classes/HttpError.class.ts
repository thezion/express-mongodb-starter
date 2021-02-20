export default class HttpError extends Error {
    errorCode: number;

    constructor(message: string, errorCode: number = 500) {
        super(message);
        this.errorCode = errorCode;
    }
}
