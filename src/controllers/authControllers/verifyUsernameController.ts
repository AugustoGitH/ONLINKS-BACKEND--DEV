import { NextFunction, Request, Response } from "express";
import normalizeString from "../../helpers/normalize-string";
import { AppError } from "../../helpers/errors/AppError";
import findOneUserByUsernameService from "../../services/userServices/findOneUserByUsernameService";
import { validateUsernameSchema } from "./validation";

const verifyUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { username } = req.params;
    username = normalizeString(username);

    const { error } = validateUsernameSchema(username);
    if (error) throw new AppError(error.message);

    const usernameExists = await findOneUserByUsernameService(username);

    res.status(200).json({ found: !!usernameExists });
  } catch (error) {
    next(error);
  }
};

export default verifyUsernameController;
