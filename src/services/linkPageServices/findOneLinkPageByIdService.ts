import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { LinkPage as ILinkPage } from "../../models/LinkPage/types";

const findOneLinkPageByIdService = async (
  id: string
): Promise<ILinkPage | null> => {
  try {
    const linkPage = await LinkPage.findById(id);

    return linkPage;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when searching for link page by id");
  }
};

export default findOneLinkPageByIdService;
