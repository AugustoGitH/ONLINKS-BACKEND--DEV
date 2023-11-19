import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { Link as ILink } from "../../models/Link/types";
import Link from "../../models/Link";

interface FindOneLinkByHrefService {
  href: string;
  linkPageId?: string;
  userId?: string;
}

const findOneLinkByHrefService = async ({
  href,
  linkPageId,
  userId,
}: FindOneLinkByHrefService): Promise<ILink | null> => {
  try {
    const link = await Link.findOne({
      href,
      ...(linkPageId && { linkPageId }),
      ...(userId && { userId }),
    });

    return link;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when searching for link by href");
  }
};

export default findOneLinkByHrefService;
