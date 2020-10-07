export interface Result<T> {
    total?: number;
    totalPage?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
    next?: number;
    prev?: number;
    currentPage?: number;
    token?: string;
    message?: string;
    id?: string;
    data: T;
}
export declare const responseBody: <T>(attr: Result<T>) => Result<T>;
