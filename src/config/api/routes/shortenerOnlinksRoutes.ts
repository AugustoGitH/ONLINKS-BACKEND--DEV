export const shortenerOnlinksRoutes = {
  CREATE: "/link/v1",
  getUpdate: (id: string) => `/link/v1/${id}`,
  getAllByUserId: (userId: string) => `/link/v1/${userId}`,
  getOneByShort: (short: string) => `/v1/find-link-by-short/${short}`,

  getDelete: (id: string) => `/link/v1/${id}`,
};
