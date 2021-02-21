interface error {
    code: number;
    message: string;
}

/**
 * Google JSON Style Guide
 * https://google.github.io/styleguide/jsoncstyleguide.xml
 */
export interface JsonResponse {
    apiVersion?: string;
    context?: string;
    id?: string;
    method?: string;
    params?: object;
    data?: object | null;
    error?: error;
}
