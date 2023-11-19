import { NextFunction, Request, Response } from "express";
import { CreateLink, UpdateLink } from "../../models/Link/types";
import {
  validateCreateLinkSchema,
  validateUpdateLinkSchema,
} from "../../models/Link/validation";
import { AppError } from "../../helpers/errors/AppError";
import findOneLinkPageByIdService from "../../services/linkPageServices/findOneLinkPageByIdService";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import handlePermissionsLimitLinkCreation from "../../helpers/handlePermissionsLimitLinkCreation";
import createLinkService from "../../services/linkServices/createLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";
import findOneLinkByTitleService from "../../services/linkServices/findOneLinkByTitleService";
import findOneLinkByHrefService from "../../services/linkServices/findOneLinkByHrefService";
import findOneLinkByIdService from "../../services/linkServices/findOneLinkByIdService";
import updateLinkService from "../../services/linkServices/updateLinkService";
import deleteLinkByIdService from "../../services/linkServices/deleteLinkByIdService";
import validPermissions from "../../helpers/validPermissions";

export const createLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const link: Omit<CreateLink, "userId"> = req.body;
  try {
    const { error } = validateCreateLinkSchema(link);
    if (error) {
      throw new AppError(error.message);
    }

    const linkPageExist = await findOneLinkPageByIdService(
      link.linkPageId,
      req.user.id
    );

    if (!linkPageExist) {
      throw new AppError("Link page does not exist", 404);
    }

    const linkExists = await findAllLinkService({
      linkPageId: linkPageExist._id,
    });

    const limitLinkCreation = handlePermissionsLimitLinkCreation(
      req.user.permissions
    );

    if (!limitLinkCreation) {
      throw new AppError("No creation limit was found for your profile", 404);
    }

    if (limitLinkCreation !== -666 && linkExists.length >= limitLinkCreation) {
      throw new AppError("Limit of broken links");
    }

    const linkTitleExist = await findOneLinkByTitleService({
      title: link.title,
      linkPageId: linkPageExist._id,
    });

    if (linkTitleExist) {
      throw new AppError("A link with the same title already exists");
    }

    const linkHrefExist = await findOneLinkByHrefService({
      href: link.href,
      linkPageId: linkPageExist._id,
    });

    if (linkHrefExist) {
      throw new AppError("A link with the same url already exists");
    }

    const linkCreated = await createLinkService({
      ...link,
      userId: req.user.id,
    });

    res
      .status(201)
      .json(extractModelProperties(linkCreated, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export const getLinkDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");

    const link = await findOneLinkByIdService({
      id,
    });

    if (!link) {
      throw new AppError("Link not found", 404);
    }

    res.status(200).json(extractModelProperties(link, linkModelResponse));
  } catch (error) {
    next(error);
  }
};
export const getLinkDetailRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new AppError("Id is required");

    const link = await findOneLinkByIdService({
      id,
      userId: req.user.id,
    });

    if (!link) {
      throw new AppError("Link not found", 404);
    }

    res.status(200).json(extractModelProperties(link, linkModelResponse));
  } catch (error) {
    next(error);
  }
};
export const updateLinkRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const linkFields: Omit<UpdateLink, "userId"> = req.body;
  const { id } = req.params;

  try {
    if (!id) throw new AppError("Id is required");

    const { error } = validateUpdateLinkSchema(linkFields);

    if (error) {
      throw new AppError(error.message);
    }

    const linkExist = await findOneLinkByIdService({
      id,
      userId: req.user.id,
    });

    if (!linkExist) {
      throw new AppError("Link not found", 404);
    }

    if (linkFields.title) {
      const linkTitleExist = await findOneLinkByTitleService({
        title: linkFields.title,
        linkPageId: linkExist._id,
        userId: req.user.id,
      });
      if (linkTitleExist) {
        throw new AppError("A link with the same title already exists");
      }
    }

    if (linkFields.href) {
      const linkHrefExist = await findOneLinkByHrefService({
        href: linkFields.href,
        linkPageId: linkExist._id,
        userId: req.user.id,
      });
      if (linkHrefExist) {
        throw new AppError("A link with the same href already exists");
      }
    }

    const linkUpdated = await updateLinkService(
      linkFields,
      linkExist._id,
      req.user.id
    );

    res
      .status(201)
      .json(extractModelProperties(linkUpdated, linkModelResponse));
  } catch (error) {
    next(error);
  }
};
export const updateLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const linkFields: Omit<UpdateLink, "userId"> = req.body;
  const { id } = req.params;

  try {
    if (!id) throw new AppError("Id is required");

    const { error } = validateUpdateLinkSchema(linkFields);

    if (error) {
      throw new AppError(error.message);
    }

    const linkExist = await findOneLinkByIdService({
      id,
    });

    if (!linkExist) {
      throw new AppError("Link not found", 404);
    }

    if (linkFields.title) {
      const linkTitleExist = await findOneLinkByTitleService({
        title: linkFields.title,
        linkPageId: linkExist._id,
      });
      if (linkTitleExist) {
        throw new AppError("A link with the same title already exists");
      }
    }

    if (linkFields.href) {
      const linkHrefExist = await findOneLinkByHrefService({
        href: linkFields.href,
        linkPageId: linkExist._id,
      });
      if (linkHrefExist) {
        throw new AppError("A link with the same href already exists");
      }
    }

    const linkUpdated = await updateLinkService(linkFields, linkExist._id);

    res
      .status(201)
      .json(extractModelProperties(linkUpdated, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export const getLinkAllController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new AppError("User id is required");
    }
    const links = await findAllLinkService({
      userId,
    });

    res.status(200).json(extractModelProperties(links, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export const getLinkAllRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { linkPageId } = req.params;
  try {
    if (!linkPageId) {
      throw new AppError("Link Page id is required");
    }
    const links = await findAllLinkService({
      linkPageId,
      userId: req.user.id,
    });
    res.status(200).json(extractModelProperties(links, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export const deleteLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new AppError("Id is required");
    }
    const linkDeleted = await deleteLinkByIdService(id);

    res
      .status(200)
      .json(extractModelProperties(linkDeleted, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export const deleteLinkRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new AppError("Id is required");
    }
    const linkDeleted = await deleteLinkByIdService(id, req.user.id);

    res
      .status(200)
      .json(extractModelProperties(linkDeleted, linkModelResponse));
  } catch (error) {
    next(error);
  }
};
