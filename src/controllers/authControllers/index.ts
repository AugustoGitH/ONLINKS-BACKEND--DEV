import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../models/User/types";
import findOneUserByEmailService from "../../services/userServices/findOneUserByEmailService";
import createUserService from "../../services/userServices/createUserService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { userModelResponse } from "./models";
import { LoginUser } from "./types";
import { AppError } from "../../helpers/errors/AppError";
import { validateLoginSchema, validateRegisterSchema } from "./validation";

import bcrypt from "bcryptjs";
import createJWTUserService from "../../services/authServices/createJWTUserService";
import findOneUserByIdService from "../../services/userServices/findOneUserByIdService";
import findOneUserByUsernameService from "../../services/userServices/findOneUserByUsernameService";
import normalizeString from "../../helpers/normalize-string";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: LoginUser = req.body;
  try {
    const { error } = validateLoginSchema(user);
    if (error) {
      throw new AppError(error.message);
    }
    const userExist = await findOneUserByEmailService(user.email);

    if (!userExist) {
      throw new AppError("Incorrect email or password");
    }

    const passwordIsValid = bcrypt.compareSync(
      user.password,
      userExist.password
    );

    if (!passwordIsValid) {
      throw new AppError("Incorrect email or password");
    }

    const payloadUser = {
      email: userExist.email,
      id: userExist._id.toString(),
      name: userExist.name,
      permissions: userExist.permissions,
    };

    const token = createJWTUserService(payloadUser);

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

export const currentUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findOneUserByIdService(req.user.id);

    if (!user) {
      throw new AppError("User not found");
    }

    res.status(200).json(extractModelProperties(user, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: CreateUser = req.body;

  try {
    const { error } = validateRegisterSchema(user);
    if (error) {
      throw new AppError(error.message);
    }

    const userExist =
      (await findOneUserByUsernameService(user.username)) ||
      (await findOneUserByEmailService(user.email));

    if (userExist) {
      throw new AppError("User already exists");
    }

    const userCreated = await createUserService(user);

    res
      .status(201)
      .json(extractModelProperties(userCreated, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export const verifyUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { username } = req.params;
  username = normalizeString(username);
  try {
    if (!username) throw new AppError("Username is required");
    if (username.length < 4)
      throw new AppError(
        "The username does not need to be at least 4 characters long"
      );
    if (username.length > 60)
      throw new AppError("The username must have a maximum of 60 characters");
    const usernameExist = await findOneUserByUsernameService(username);

    res.status(200).json({ found: !!usernameExist });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findOneUserByIdService(req.user.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res
      .status(201)
      .clearCookie(process.env.TOKEN_NAME || "")
      .json(extractModelProperties(user, userModelResponse));
  } catch (error) {
    next(error);
  }
};
