export type PermissionRoutesUser =
  | "create-user"
  | "update-user"
  | "find-users"
  | "find-user"
  | "delete-user";

export type PermissionRoutesAuth = "logout";

export type PermissionRoutesLinkPage =
  | "find-link-pages"
  | "create-link-page"
  | "find-link-page"
  | "delete-link-page"
  | "update-link-page"
  | "find-link-page-restrict"
  | "find-link-pages-restrict"
  | "delete-link-page-restrict"
  | "update-link-restrict";
export type PermissionRoutesLink =
  | "create-link"
  | "find-links"
  | "find-link"
  | "find-link-restrict"
  | "find-links-restrict"
  | "update-link"
  | "update-link-restrict"
  | "delete-link"
  | "delete-link-restrict";
export type PermissionRoutesLimitLinkPageCreation =
  | "unlimited-link-page-creation"
  | "unique-link-page-creation"
  | "two-link-page-creation";

export type PermissionRoutesLimitLinkCreation =
  | "unlimited-link-creation"
  | "two-link-creation"
  | "three-link-creation"
  | "four-link-creation"
  | "five-link-creation";

export type PermissionPlus = "view-panel";

export type Permission =
  | PermissionRoutesUser
  | PermissionPlus
  | PermissionRoutesLinkPage
  | PermissionRoutesAuth
  | PermissionRoutesLink
  | PermissionRoutesLimitLinkCreation
  | PermissionRoutesLimitLinkPageCreation;
