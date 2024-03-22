export interface ShortenerLink {
  short: string;
  originalUrl: string;
  expirationDate: number | null;
  clicks: number;
  title: string;
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateShortenerLink = Pick<
  ShortenerLink,
  "originalUrl" | "userId" | "title"
> &
  Partial<Pick<ShortenerLink, "short" | "expirationDate">>;

export type UpdateShortenerLink = Partial<
  CreateShortenerLink & Pick<ShortenerLink, "clicks">
>;
