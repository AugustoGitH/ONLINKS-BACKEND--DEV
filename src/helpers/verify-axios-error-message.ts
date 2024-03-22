import { AxiosError } from "axios";

export default function verifyAxiosErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data.message;
  }
  return null;
}
