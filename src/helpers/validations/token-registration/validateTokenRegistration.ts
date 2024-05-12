import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";

import authConfig from "../../../config/auth";

import { groupPermissionAll } from "../../../permissions/groups";
import { RegistrationPreferencesPayload } from "../../../types/payload/RegistrationPreferencesPayload";
import findOneByTokenRegistrationService from "../../../services/tokenRegistrationServices/findOneByTokenRegistrationService";
import updateTokenRegistrationService from "../../../services/tokenRegistrationServices/updateTokenRegistrationService";

const validateTokenRegistration = async (token: string) => {
  try {
    const decoded = verify(
      token,
      authConfig.secret
    ) as RegistrationPreferencesPayload;
    const { permissions } = decoded;

    const isValidPermissions = permissions.every((p) =>
      groupPermissionAll.includes(p)
    );

    const tokenRegistrationFinded = await findOneByTokenRegistrationService(
      token
    );

    if (!isValidPermissions || !tokenRegistrationFinded) {
      return null;
    }

    if (tokenRegistrationFinded.used) {
      return null;
    } else {
      await updateTokenRegistrationService(
        {
          used: true,
        },
        tokenRegistrationFinded._id
      );
    }

    return {
      permissions,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default validateTokenRegistration;
