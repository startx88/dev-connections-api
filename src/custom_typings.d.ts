// jwt response
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    export interface Request extends Express.Request {
      currentUser: UserPayload;
    }
  }
}
