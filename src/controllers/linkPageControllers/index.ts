import { NextFunction, Request, Response } from "express";
import findAllLinkPagesService from "../../services/linkPageServices/findAllLinkPagesService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkPageModelResponse } from "./models";
import { AppError } from "../../helpers/errors/AppError";
import findOneLinkPageByIdService from "../../services/linkPageServices/findOneLinkPageByIdService";
import {
  validateCreateLinkPageSchema,
  validateUpdateLinkPageSchema,
} from "../../models/LinkPage/validation";
import { CreateLinkPage, UpdateLinkPage } from "../../models/LinkPage/types";
import createLinkPageService from "../../services/linkPageServices/createLinkPageService";
import updateLinkPageService from "../../services/linkPageServices/updateLinkPageService";
import findOneLinkPageDefaultService from "../../services/linkPageServices/findOneLinkPageDefaultService";
import deleteLinkPageByIdService from "../../services/linkPageServices/deleteLinkPageByIdService";
import handlePermissionsLimitLinkPageCreation from "../../helpers/handlePermissionsLimitLinkPageCreation";

export const getLinkPageAllController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkPages = await findAllLinkPagesService();

    res
      .status(200)
      .json(extractModelProperties(linkPages, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const getLinkPageAllRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkPages = await findAllLinkPagesService(req.user.id);
    res
      .status(200)
      .json(extractModelProperties(linkPages, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const getLinkPageDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");

    const linkPage = await findOneLinkPageByIdService(id);

    if (!linkPage) {
      throw new AppError("Link Page not found", 404);
    }

    res
      .status(200)
      .json(extractModelProperties(linkPage, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const getLinkPageDetailRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");

    const linkPage = await findOneLinkPageByIdService(id, req.user.id);

    if (!linkPage) {
      throw new AppError("Link Page not found", 404);
    }

    res
      .status(200)
      .json(extractModelProperties(linkPage, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const deleteLinkPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");
    const linkPageDeleted = await deleteLinkPageByIdService(id);

    res
      .status(201)
      .json(extractModelProperties(linkPageDeleted, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const deleteLinkPageRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");
    const linkPageDeleted = await deleteLinkPageByIdService(id, req.user.id);

    res
      .status(201)
      .json(extractModelProperties(linkPageDeleted, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const updateLinkPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const linkPageFields: Omit<UpdateLinkPage, "userId"> = req.body;
  const { id } = req.params;

  try {
    if (!id) throw new AppError("Id is required");

    const { error } = validateUpdateLinkPageSchema(linkPageFields);

    if (error) {
      throw new AppError(error.message);
    }

    if (linkPageFields.isDefault) {
      const linkPageDefault = await findOneLinkPageDefaultService(req.user.id);

      if (linkPageDefault) {
        await updateLinkPageService({ isDefault: false }, linkPageDefault._id);
      }
    }

    const linkPageUpdated = await updateLinkPageService(linkPageFields, id);

    res
      .status(201)
      .json(extractModelProperties(linkPageUpdated, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
export const updateLinkPageRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const linkPageFields: Omit<UpdateLinkPage, "userId"> = req.body;
  const { id } = req.params;

  try {
    if (!id) throw new AppError("Id is required");

    const { error } = validateUpdateLinkPageSchema(linkPageFields);

    if (error) {
      throw new AppError(error.message);
    }

    if (linkPageFields.isDefault) {
      const linkPageDefault = await findOneLinkPageDefaultService(req.user.id);

      if (linkPageDefault) {
        await updateLinkPageService(
          { isDefault: false },
          linkPageDefault._id,
          req.user.id
        );
      }
    }

    const linkPageUpdated = await updateLinkPageService(
      linkPageFields,
      id,
      req.user.id
    );

    res
      .status(201)
      .json(extractModelProperties(linkPageUpdated, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};

export const createLinkPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const linkPage: Omit<CreateLinkPage, "userId"> = req.body;
  try {
    const { error } = validateCreateLinkPageSchema(linkPage);

    if (error) {
      throw new AppError(error.message);
    }

    const linkPageExists = await findAllLinkPagesService(req.user.id);

    const limitLinkPageCreation = handlePermissionsLimitLinkPageCreation(
      req.user.permissions
    );

    if (!limitLinkPageCreation) {
      throw new AppError("No creation limit was found for your profile", 404);
    }

    if (
      limitLinkPageCreation !== -666 &&
      linkPageExists.length >= limitLinkPageCreation
    ) {
      throw new AppError("Limit of broken link pages");
    }

    if (linkPage.isDefault) {
      const linkPageDefault = await findOneLinkPageDefaultService(req.user.id);

      if (linkPageDefault) {
        await updateLinkPageService(
          { isDefault: false },
          linkPageDefault._id,
          req.user.id
        );
      }
    }

    const linkPageCreated = await createLinkPageService({
      ...linkPage,
      userId: req.user.id,
    });

    res
      .status(201)
      .json(extractModelProperties(linkPageCreated, linkPageModelResponse));
  } catch (error) {
    next(error);
  }
};
