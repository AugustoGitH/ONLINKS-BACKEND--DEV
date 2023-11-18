import { sign } from "jsonwebtoken";
import { AppError } from "../../helpers/errors/AppError";
import authConfig from "../../config/auth";

interface PayloadUser {
  email: string;
  name: string;
  permissions: string[];
  id: string;
}

const createJWTUserService = (payload: PayloadUser) => {
  const { secret, expiresIn } = authConfig;
  try {
    const token = sign(payload, secret, {
      subject: payload.id,
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when creating jwt for user");
  }
};

export default createJWTUserService;
