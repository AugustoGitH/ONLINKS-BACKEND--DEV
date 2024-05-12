import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../../config/auth";
import { Permission } from "../../permissions/types";
import { UserPayload } from "../../types/payload/UserPayload";

const isAuth =
  (permissionsAuth?: Permission[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token: string | null = req.cookies["onlinks-sytem-token"];

    if (!token) {
      throw new AppError("Unauthorized credentials", 403);
    }

    try {
      const decoded = verify(token, authConfig.secret) as UserPayload;
      const { id, permissions } = decoded;

      const isValidPermissions = permissionsAuth
        ? permissions.some((p) => permissionsAuth.includes(p))
        : true;

      if (!isValidPermissions) {
        throw new AppError("Unauthorized credentials", 403);
      }

      req.user = { id, permissions };

      next();
    } catch (error) {
      console.error(error);
      throw new AppError("Unauthorized credentials", 403);
    }
  };

export default isAuth;
