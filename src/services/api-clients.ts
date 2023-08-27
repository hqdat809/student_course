import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { EAuthToken, TSignInResponse } from "../interfaces/auth-interface";
import { handleStorageToken } from "../utils/storage-utils";
import { SIGNIN } from "../routes/paths";

const instance = axios.create({
  baseURL: "http://127.0.0.1:9090/api", // Replace with your API URL
  timeout: 10000, // Set request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

const requestHandler = (config: AxiosRequestConfig) => {
  const atk = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  if (atk) {
    const configHeaders = {
      Authorization: `Bearer ${atk}`,
      ...config.headers,
    };
    config.headers = configHeaders;

    config.params = {
      ...config.params,
      version: Date.now(),
    };
  }

  return config;
};

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// const responseErrorHandler = async (err: AxiosError) => {
//   const originalRequest = err.config;
//   console.log(originalRequest);
//   console.log(err?.response?.status === 403);
//   console.log(localStorage.getItem(EAuthToken.REFRESH_TOKEN));
//   if (err?.response?.status === 403) {
//     isRefreshing = true;

//     if (isRefreshing) {
//       return new Promise(function (resolve, reject) {
//         axios
//           .create({
//             baseURL: "http://127.0.0.1:9090/api",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem(
//                 EAuthToken.REFRESH_TOKEN
//               )}`,
//             },
//           })
//           .post("/v1/auth/refresh", {
//             refreshToken: localStorage.getItem(EAuthToken.REFRESH_TOKEN),
//           })
//           .then(({ data }: AxiosResponse<TSignInResponse>) => {
//             handleStorageToken({
//               token: data.token,
//               refreshToken: data.refreshToken,
//             });

//             originalRequest?.headers.Authorization = `Bearer ${data.token}`;

//             data.token && processQueue(null, data.token);

//             resolve(instance(originalRequest));
//             // resolve(window.location.reload());
//           })
//           .catch((err) => {
//             processQueue(err, "");
//             localStorage.clear();
//             window.location.pathname = SIGNIN;
//             reject(err);
//           })
//           .then(() => {
//             isRefreshing = false;
//           });
//       });
//     }
//   }

//   // const data: any = err?.response?.data;
//   // const message = data?.message;

//   // if (message) throw new Error(message);
//   return Promise.reject(err);
// };

const refreshAccessToken = async () => {
  const response = await axios
    .create({
      baseURL: "http://127.0.0.1:9090/api",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          EAuthToken.REFRESH_TOKEN
        )}`,
      },
    })
    .post("/v1/auth/refresh", {
      refreshToken: localStorage.getItem(EAuthToken.REFRESH_TOKEN),
    });
  return response.data;
};

instance.interceptors.request.use(requestHandler, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If response status is 401 (Unauthorized) and we haven't already started token refresh
    if (error.response.status === 403 && !isRefreshing) {
      isRefreshing = true;

      const newAccessToken = await refreshAccessToken();
      failedQueue = [];
      localStorage.setItem(EAuthToken.ACCESS_TOKEN, newAccessToken.token);
      localStorage.setItem(
        EAuthToken.REFRESH_TOKEN,
        newAccessToken.refreshToken
      );

      // Update the Authorization header for the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;

      isRefreshing = false;
      failedQueue = [];
      // Retry the original request
      return instance(originalRequest);
    }
    const data: any = error?.response?.data;
    const message = data?.message;

    if (message) throw new Error(message);

    // If token refresh failed or there was another error, reject the request
    return Promise.reject(error);
  }
);

export { instance as ApiClient };
