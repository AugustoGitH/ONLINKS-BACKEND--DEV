import { NextFunction, Request, Response } from "express";
import findAllLinkPagesService from "../../services/linkPageServices/findAllLinkPagesService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkPageModelResponse } from "./models";
import { AppError } from "../../helpers/errors/AppError";
import findOneLinkPageByIdService from "../../services/linkPageServices/findOneLinkPageByIdService";

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

export const getLinkPageDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
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
