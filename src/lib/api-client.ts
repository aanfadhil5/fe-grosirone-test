import Axios from "axios";
import toast from "react-hot-toast";

export const api = Axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);
