import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findAllLinkPagesService from "../../services/linkPageServices/findAllLinkPagesService";
import findOneUserByIdService from "../../services/userServices/findOneUserByIdService";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import findOneUserByUsernameService from "../../services/userServices/findOneUserByUsernameService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "../linkControllers/models";
import { linkPageModelResponse } from "../linkPageControllers/models";

export const getPageDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;

    if (!username) {
      throw new AppError("Username not found!", 404);
    }

    const user = await findOneUserByUsernameService(username);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    const linkPages = await findAllLinkPagesService(user.id);

    const linkPagesTrated = await Promise.all(
      linkPages.map(async (linkPage) => ({
        ...linkPage.toObject(),
        links: extractModelProperties(
          await findAllLinkService({
            linkPageId: linkPage.id,
            userId: user.id,
          }),
          linkModelResponse
        ),
      }))
    );
    res.status(200).json({
      linkPages: extractModelProperties(linkPagesTrated, linkPageModelResponse),
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
