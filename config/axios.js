import Axios from "axios";

const axiosClient = Axios.create({
    baseURL: process.env.backendURL
});

export  default axiosClient;