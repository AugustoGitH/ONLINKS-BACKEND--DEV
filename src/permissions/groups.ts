import {
  Permission,
  PermissionRoutesLimitLinkCreation,
  PermissionRoutesLimitLinkPageCreation,
  PermissionRoutesLimitTokenRegistrationCreation,
  PermissionShortenerLink,
  PermissionTokenRegistration,
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
  "update-link-page-restrict",
  "update-user",
  "view-panel",
  "create-short-link-username-registering",
  "shorten-link-page-links",
  "create-token-registration",
  "delete-token-registration",
  "delete-token-registration-restrict",
  "find-token-registration",
  "find-token-registration-restrict",
  "find-token-registrations",
  "find-token-registrations-restrict",
  "update-token-registration",
  "update-token-registration-restrict",
  "four-token-registration-creation",
  "three-token-registration-creation",
  "two-token-registration-creation",
  "unique-token-registration-creation",
  "unlimited-token-registration-creation",
];

export const groupPermissionShortenerLink: PermissionShortenerLink[] = [
  "create-short-link-username-registering",
  "shorten-link-page-links",
];

export const groupPermissionTokenRegistration: PermissionTokenRegistration[] = [
  "create-token-registration",
  "delete-token-registration",
  "delete-token-registration-restrict",
  "find-token-registration",
  "find-token-registration-restrict",
  "find-token-registrations",
  "find-token-registrations-restrict",
  "update-token-registration",
  "update-token-registration-restrict",
];

export const groupPermissionRoutesLimitTokenRegistrationCreation: PermissionRoutesLimitTokenRegistrationCreation[] =
  [
    "four-token-registration-creation",
    "three-token-registration-creation",
    "two-token-registration-creation",
    "unique-token-registration-creation",
    "unlimited-token-registration-creation",
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
