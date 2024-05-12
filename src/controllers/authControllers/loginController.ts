import { NextFunction, Request, Response } from "express";
import { LoginUser } from "./types";
import { validateLoginSchema } from "./validation";
import findOneUserByEmailService from "../../services/userServices/findOneUserByEmailService";
import { AppError } from "../../helpers/errors/AppError";
import bcrypt from "bcryptjs";
import createJWTUserAuthService from "../../services/authServices/createJWTUserAuthService";
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: LoginUser = req.body;

    const { error } = validateLoginSchema(user);
    if (error) throw new AppError(error.message);

    const userExist = await findOneUserByEmailService(user.email);

    if (!userExist) throw new AppError("Incorrect email or password");

    const passwordIsValid = bcrypt.compareSync(
      user.password,
      userExist.password
    );

    if (!passwordIsValid) throw new AppError("Incorrect email or password");

    const payloadUser = {
      email: userExist.email,
      id: userExist._id.toString(),
      name: userExist.name,
      permissions: userExist.permissions,
    };

    const token = createJWTUserAuthService(payloadUser);

    res
      .status(201)
      .cookie(process.env.TOKEN_NAME || "", token, {
        secure: true,
        httpOnly: true,
      })
      .json({
        message: "Login successfully",
      });
  } catch (error) {
    next(error);
  }
};

export default loginController;
