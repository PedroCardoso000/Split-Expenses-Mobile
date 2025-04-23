import axios from "axios";

export const api = axios.create({
  // baseURL: "https://petconnectbackend-r2ldr42g.b4a.run/", // URL DA API
  baseURL: " http://192.168.15.9:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer $2a$10$JCcTh6cFhNR4KphocFPmSuLjanLrhIJGCGL5I9aWXHOF6kP0l3ejW`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
    }
    return Promise.reject(error);
  }
);