import { sign } from "jsonwebtoken";
import { AppError } from "../../helpers/errors/AppError";
import authConfig from "../../config/auth";
import { UserPayload } from "../../types/payload/UserPayload";
import { RegistrationPreferencesPayload } from "../../types/payload/RegistrationPreferencesPayload";

const createJWTRegistrationPreferencesService = (
  payload: RegistrationPreferencesPayload,
  expiresIn?: string | number
) => {
  const { secret } = authConfig;
  try {
    const token = sign(payload, secret, {
      expiresIn,
    });

    return token;
  } catch (error) {
    console.error(error);
    throw new AppError(
      "An error occurred when creating jwt for registration preferences"
    );
  }
};

export default createJWTRegistrationPreferencesService;
