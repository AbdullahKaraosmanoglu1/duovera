export class BaseException extends Error {
    constructor(public message: string, public code?: string, public details?: any) {
        super(message);
        this.name = new.target.name;
    }
}
