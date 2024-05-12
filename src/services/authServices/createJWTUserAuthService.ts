import { sign } from "jsonwebtoken";
import { AppError } from "../../helpers/errors/AppError";
import authConfig from "../../config/auth";
import { UserPayload } from "../../types/payload/UserPayload";

const createJWTUserAuthService = (payload: UserPayload) => {
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

export default createJWTUserAuthService;
