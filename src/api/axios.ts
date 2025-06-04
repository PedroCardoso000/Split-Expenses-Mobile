import axios from "axios";

export const api = axios.create({
  // baseURL: "https://petconnectbackend-r2ldr42g.b4a.run/", // URL DA API
  baseURL: " http://ec2-3-21-134-188.us-east-2.compute.amazonaws.com/api/v1/",
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