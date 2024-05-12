import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";

const getLinkAllRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { linkPageId } = req.params;

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

export default getLinkAllRestrictController;
