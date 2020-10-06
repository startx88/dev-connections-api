import jwt from "jsonwebtoken";
import { UserDoc } from "../models/user";
import { defautlConfig } from "../config";

// jwt response
interface UserPayload {
  email: string;
  id: string;
}

// Jwt class
class JWT {
  constructor(public user?: UserDoc) {}

  // generate token
  generateToken(hour: number = 1) {
    const token = jwt.sign(
      { email: this.user?.email, id: this.user?._id },
      defautlConfig.SECRET_KEY,
      { expiresIn: hour + "h" }
    );
    return token;
  }

  // verity jwt token
  verifyJwtToken(token: string) {
    return jwt.verify(token, defautlConfig.SECRET_KEY) as UserPayload;
  }
}

export { JWT };
