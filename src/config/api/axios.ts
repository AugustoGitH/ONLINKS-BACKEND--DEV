import axios from "axios";

const shortenerOnlinks = axios.create({
  baseURL: `${"http://localhost:5050"}/api`,
  withCredentials: true,
  headers: {
    ["access-key"]: process.env.ACCESS_KEY_SHORTENER_ONLINKS,
  },
});

export const api = {
  shortenerOnlinks,
};
