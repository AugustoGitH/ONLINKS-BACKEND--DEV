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
  | "delete-link-page";

export type PermissionPlus = "view-panel";

export type Permission =
  | PermissionRoutesUser
  | PermissionPlus
  | PermissionRoutesLinkPage
  | PermissionRoutesAuth;
