import axios from "axios";
import cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const currentLanguage = cookies.get("i18next") || "vi";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": currentLanguage,
  },
});

axiosInstance.interceptors.request.use((req) => {
  req.headers.apikey = apiKey;
  return req;
});

export default axiosInstance;

export const createOrder = async (data) =>
  axiosInstance.post("/api/web/order", data);
export const cancelOrder = async (data) =>
  axiosInstance.post("/api/web/order/cancel", data);
export const getOrderDetail = async (orderId) =>
  axiosInstance.get(`/api/web/order/${orderId}`);
export const createPayment = async (data) =>
  axiosInstance.post("/api/web/order/pay", data);
export const callStaff = async (data) =>
  axiosInstance.post("/api/web/notification", data);
export const createFeedback = async (data) =>
  axiosInstance.post("/api/web/vote", data);
export const createQrCode = async (data) =>
  axiosInstance.post("/api/web/payment/create-qr", data, {
    responseType: "blob",
  });
export const getDeepLink = async (orderCode) =>
  axiosInstance.get(`/api/deep-link/${orderCode}`);
