export const shortenerOnlinksRoutes = {
  CREATE: "/link/v1",
  getUpdate: (id: string) => `/link/v1/${id}`,
  getAllByUserId: (userId: string) => `/link/v1/${userId}`,
  getOneByShort: (short: string) => `/link/find-link-by-short/v1/${short}`,

  getDelete: (id: string) => `/link/v1/${id}`,
};
