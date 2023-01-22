import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const HEADERS = {
  "Content-Type": "application/json",
};

export const Axios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    ...HEADERS,
  },
});
