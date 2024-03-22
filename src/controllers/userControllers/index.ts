import { NextFunction, Request, Response } from "express";
import findOneUserByIdService from "../../services/userServices/findOneUserByIdService";
import { AppError } from "../../helpers/errors/AppError";
import extractModelProperties from "../../helpers/extractModelProperties";
import { userModelResponse } from "./models";
import findAllUserService from "../../services/userServices/findAllUserService";
import deleteUserByIdService from "../../services/userServices/deleteUserByIdService";
import { CreateUser, UpdateUser } from "../../models/User/types";
import {
  validateCreateUserSchema,
  validateUpdateUserSchema,
} from "../../models/User/validation";
import updateUserService from "../../services/userServices/updateUserService";
import findOneUserByEmailService from "../../services/userServices/findOneUserByEmailService";
import createUserService from "../../services/userServices/createUserService";
import findOneUserByUsernameService from "../../services/userServices/findOneUserByUsernameService";
import { PermissionShortenerLinkEnum } from "../../permissions/enums";
import createShortenerLinkService from "../../services/shortenerLinkServices/createShortenerLinkService";
import deleteShortenerLinkService from "../../services/shortenerLinkServices/deleteShortenerLinkService";
import findOneShortenerLinkByShortService from "../../services/shortenerLinkServices/findOneShortenerLinkByShortService";
import updateShortenerLinkService from "../../services/shortenerLinkServices/updateShortenerLinkService";

export const getUserDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");

    const user = await findOneUserByIdService(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json(extractModelProperties(user, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export const getUserAllController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUserService();

    res.status(200).json(extractModelProperties(users, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userFields: CreateUser = req.body;

  try {
    const { error } = validateCreateUserSchema(userFields);

    if (error) {
      throw new AppError(error.message);
    }

    const userExist =
      (await findOneUserByUsernameService(userFields.username)) ||
      (await findOneUserByEmailService(userFields.email));

    if (userExist) {
      throw new AppError("User already exists");
    }

    const userCreated = await createUserService(userFields);
    if (
      userCreated.permissions.includes(
        PermissionShortenerLinkEnum.CREATE_SHORT_LINK_USERNAME_REGISTERING
      )
    ) {
      await createShortenerLinkService({
        originalUrl: `${process.env.LINK_USERNAME_ONLINKS as string}/${
          userCreated.username
        }`,
        title: `shortener-link-username-${userCreated.username}`,
        userId: userCreated._id,

        short: userCreated.username,
      });
    }
    res
      .status(201)
      .json(extractModelProperties(userCreated, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userFields: UpdateUser = req.body;
  const { id } = req.params;

  try {
    if (!id) throw new AppError("Id is required");

    const { error } = validateUpdateUserSchema(userFields);

    if (error) {
      throw new AppError(error.message);
    }

    if (userFields.email) {
      const userExist = await findOneUserByEmailService(userFields.email);

      if (userExist) {
        throw new AppError("User already exists");
      }
    }

    if (userFields.username) {
      const userExist = await findOneUserByUsernameService(userFields.username);

      if (userExist) {
        throw new AppError("User already exists");
      }
    }
    if (userFields.username) {
      const shortFinded = await findOneShortenerLinkByShortService(
        userFields.username
      );
      if (shortFinded) {
        await updateShortenerLinkService(shortFinded._id, {
          short: userFields.username,
          originalUrl: `${process.env.LINK_USERNAME_ONLINKS as string}/${
            userFields.username
          }`,
          title: `shortener-link-username-${userFields.username}`,
        });
      }
    }
    const userUpdated = await updateUserService(userFields, id);

    res
      .status(201)
      .json(extractModelProperties(userUpdated, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");
    const userDeleted = await deleteUserByIdService(id);

    if (
      userDeleted.permissions.includes(
        PermissionShortenerLinkEnum.CREATE_SHORT_LINK_USERNAME_REGISTERING
      )
    ) {
      const short = await findOneShortenerLinkByShortService(
        userDeleted.username
      );
      if (short) {
        await deleteShortenerLinkService(short._id);
      }
    }
    res
      .status(201)
      .json(extractModelProperties(userDeleted, userModelResponse));
  } catch (error) {
    next(error);
  }
};
