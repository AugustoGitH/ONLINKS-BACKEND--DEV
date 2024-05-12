import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../models/User/types";
import { validateRegisterSchema } from "./validation";
import { AppError } from "../../helpers/errors/AppError";
import findOneUserByUsernameService from "../../services/userServices/findOneUserByUsernameService";
import findOneUserByEmailService from "../../services/userServices/findOneUserByEmailService";
import createUserService from "../../services/userServices/createUserService";
import { PermissionShortenerLinkEnum } from "../../permissions/enums";
import createShortenerLinkService from "../../services/shortenerLinkServices/createShortenerLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { userModelResponse } from "./models";
import { RegisterUser } from "./types";
import { Permission } from "../../permissions/types";
import validateTokenRegistration from "../../helpers/validations/token-registration/validateTokenRegistration";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: RegisterUser = req.body;

    const { error } = validateRegisterSchema(user);
    if (error) throw new AppError(error.message);

    const userExist =
      (await findOneUserByUsernameService(user.username)) ||
      (await findOneUserByEmailService(user.email));

    if (userExist) throw new AppError("E-mail already exists");

    const validationToken = user.token
      ? await validateTokenRegistration(user.token)
      : null;

    if (user.token && !validationToken) {
      throw new AppError("Token is invalid!");
    }

    const userCreated = await createUserService({
      ...user,
      permissions: validationToken?.permissions ?? ["view-panel", "logout"],
    });

    if (
      userCreated.permissions.includes(
        PermissionShortenerLinkEnum.CREATE_SHORT_LINK_USERNAME_REGISTERING
      )
    ) {
      try {
        await createShortenerLinkService({
          originalUrl: `${process.env.LINK_USERNAME_ONLINKS as string}/${
            userCreated.username
          }`,
          title: `shortener-link-username-${userCreated.username}`,
          userId: userCreated._id,

          short: user.username,
        });
      } catch (error) {
        console.error(error);
      }
    }
    res
      .status(201)
      .json(extractModelProperties(userCreated, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export default registerController;
