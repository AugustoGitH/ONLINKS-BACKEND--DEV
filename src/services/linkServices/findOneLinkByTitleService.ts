import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { Link as ILink } from "../../models/Link/types";
import Link from "../../models/Link";

interface FindOneLinkByTitleService {
  title: string;
  linkPageId?: string;
  userId?: string;
}

const findOneLinkByTitleService = async ({
  title,
  linkPageId,
  userId,
}: FindOneLinkByTitleService): Promise<ILink | null> => {
  try {
    const link = await Link.findOne({
      title,
      ...(linkPageId && { linkPageId }),
      ...(userId && { userId }),
    });

    return link;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when searching for link by title");
  }
};

export default findOneLinkByTitleService;
