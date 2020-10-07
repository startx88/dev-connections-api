import { UserDoc } from "../models/user";
interface UserPayload {
    email: string;
    id: string;
}
declare class JWT {
    user?: UserDoc | undefined;
    constructor(user?: UserDoc | undefined);
    generateToken(hour?: number): string;
    verifyJwtToken(token: string): UserPayload;
}
export { JWT };
