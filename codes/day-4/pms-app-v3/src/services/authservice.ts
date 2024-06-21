import { AxiosResponse } from "axios"
import axiosInstance from "../config/axiosconfig"
import { ApiResponse } from "../models/apiresponse"
import { User } from "../models/user"

export const register = (user: User): Promise<AxiosResponse<ApiResponse<User>>> => {
    return axiosInstance.post<ApiResponse<User>>('auth/register', user)
}

export const authenticate = (user: User): Promise<AxiosResponse<ApiResponse<string>>> => {
    return axiosInstance.post<ApiResponse<string>>('auth/authenticate', user)
}