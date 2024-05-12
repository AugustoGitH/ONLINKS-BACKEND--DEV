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
  | "update-link-page-restrict";
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
export type PermissionTokenRegistration =
  | "create-token-registration"
  | "delete-token-registration-restrict"
  | "delete-token-registration"
  | "update-token-registration"
  | "update-token-registration-restrict"
  | "find-token-registration-restrict"
  | "find-token-registration"
  | "find-token-registrations"
  | "find-token-registrations-restrict";
export type PermissionRoutesLimitTokenRegistrationCreation =
  | "unlimited-token-registration-creation"
  | "unique-token-registration-creation"
  | "two-token-registration-creation"
  | "three-token-registration-creation"
  | "four-token-registration-creation";
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

export type PermissionShortenerLink =
  | "create-short-link-username-registering"
  | "shorten-link-page-links";
export type Permission =
  | PermissionRoutesUser
  | PermissionPlus
  | PermissionRoutesLinkPage
  | PermissionRoutesAuth
  | PermissionRoutesLink
  | PermissionRoutesLimitLinkCreation
  | PermissionRoutesLimitLinkPageCreation
  | PermissionShortenerLink
  | PermissionRoutesLimitTokenRegistrationCreation
  | PermissionTokenRegistration;
