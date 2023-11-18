export default {
  secret: process.env.TOKEN_SECRET || "mysecret",
  expiresIn: "1d",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
  refreshExpiresIn: "7d",
};
