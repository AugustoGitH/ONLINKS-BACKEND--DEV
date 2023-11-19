import {
  PermissionRoutesLimitLinkCreation,
  PermissionRoutesLimitLinkPageCreation,
} from "./types";

export const limitsCreationPageLink: Record<
  PermissionRoutesLimitLinkPageCreation,
  number
> = {
  "unique-link-page-creation": 1,
  "two-link-page-creation": 2,
  "unlimited-link-page-creation": -666,
};

export const limitsCreationLink: Record<
  PermissionRoutesLimitLinkCreation,
  number
> = {
  "two-link-creation": 2,
  "three-link-creation": 3,
  "four-link-creation": 4,
  "five-link-creation": 5,
  "unlimited-link-creation": -666,
};
