import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not a retry already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth/refresh`,
            { refreshToken }
          );

          const { idToken, refreshToken: newRefreshToken } = response.data;

          // Save new tokens
          localStorage.setItem("token", idToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update header and retry
          api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
          originalRequest.headers.Authorization = `Bearer ${idToken}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
