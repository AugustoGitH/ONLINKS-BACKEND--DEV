import {
  Permission,
  PermissionRoutesLimitLinkCreation,
  PermissionRoutesLimitLinkPageCreation,
} from "./types";

export const groupPermissionAll: Permission[] = [
  "create-link",
  "create-link-page",
  "create-user",
  "delete-link",
  "delete-link-page",
  "delete-link-page-restrict",
  "delete-link-restrict",
  "delete-user",
  "find-link",
  "find-link-page",
  "find-link-page-restrict",
  "find-link-pages",
  "find-link-pages-restrict",
  "find-link-restrict",
  "find-links",
  "find-links-restrict",
  "find-user",
  "find-users",
  "five-link-creation",
  "four-link-creation",
  "logout",
  "three-link-creation",
  "two-link-creation",
  "two-link-page-creation",
  "unique-link-page-creation",
  "unlimited-link-creation",
  "unlimited-link-page-creation",
  "update-link",
  "update-link-page",
  "update-link-restrict",
  "update-user",
  "view-panel",
];

export const groupPermissionSuperAdmin: Permission[] = groupPermissionAll;

export const groupPermissionLimitLinkPageCreation: PermissionRoutesLimitLinkPageCreation[] =
  [
    "two-link-page-creation",
    "unique-link-page-creation",
    "unlimited-link-page-creation",
  ];

export const groupPermissionLimitLinkCreation: PermissionRoutesLimitLinkCreation[] =
  [
    "five-link-creation",
    "four-link-creation",
    "three-link-creation",
    "two-link-creation",
    "unlimited-link-creation",
  ];
