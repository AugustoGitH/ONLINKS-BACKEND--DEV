import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { Link as ILink } from "../../models/Link/types";
import Link from "../../models/Link";

interface FindOneLinkByIdService {
  id: string;
  linkPageId?: string;
  userId?: string;
}

const findOneLinkByIdService = async ({
  id,
  linkPageId,
  userId,
}: FindOneLinkByIdService): Promise<ILink | null> => {
  try {
    const link = await Link.findOne({
      _id: id,
      ...(linkPageId && { linkPageId }),
      ...(userId && { userId }),
    });

    return link;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when searching for link by id");
  }
};

export default findOneLinkByIdService;
