import HttpError from '../classes/HttpError.class';
import { JsonResponse } from '../@types/JsonResponse';

export default function createJson(data: object | null = null, error: Error | undefined = undefined) {
    const output: JsonResponse = {
        data: data,
    };

    if (error) {
        const code = error instanceof HttpError ? error.errorCode : 500;
        output.error = {
            code,
            message: error.message,
        };
    }

    return output;
}
