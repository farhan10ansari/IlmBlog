import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios"

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${"token"}`;
    config.headers["Content-Type"] = "application/json";

    return config
})
const handleSuccess = (response: AxiosResponse) => {

    return response
}

const handleError = (error: AxiosError) => {

    return Promise.reject(error);
}

api.interceptors.response.use(handleSuccess, handleError)

export default api