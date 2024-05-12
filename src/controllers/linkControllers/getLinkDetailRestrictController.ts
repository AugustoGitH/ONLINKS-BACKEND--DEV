import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findOneLinkByIdService from "../../services/linkServices/findOneLinkByIdService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";

const getLinkDetailRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: linkId } = req.params;
    if (!linkId) throw new AppError("ID is required!");

    const linkFound = await findOneLinkByIdService({
      id: linkId,
      userId: req.user.id,
    });

    if (!linkFound) throw new AppError("Link not found", 404);

    res.status(200).json(extractModelProperties(linkFound, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export default getLinkDetailRestrictController;
