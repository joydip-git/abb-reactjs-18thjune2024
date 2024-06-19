import { AxiosResponse } from "axios";
import { ApiResponse } from "../models/apiresponse";
import { Product } from "../models/product";
import axiosInstance from "../config/axiosconfig";

export const getProducts = (): Promise<AxiosResponse<ApiResponse<Product[]>>> => {
    //{ "message":"", "data":[{},{},..]|null}
    return axiosInstance.get<ApiResponse<Product[]>>('products')
}

export const getProduct = (id: number): Promise<AxiosResponse<ApiResponse<Product>>> => {
    //{ "message":"", "data":{} |null}
    return axiosInstance.get<ApiResponse<Product>>(`products/${id}`)
}

export const deleteProduct = (id: number): Promise<AxiosResponse<ApiResponse<Product>>> => {
    ////{ "message":"", "data":[{},{},..]|null}
    return axiosInstance.delete<ApiResponse<Product>>(`products/${id}`)
}

export const updateProduct = (id: number, p: Product): Promise<AxiosResponse<ApiResponse<Product>>> => {
    //{ "message":"", "data":[{},{},..]|null}
    return axiosInstance.put<ApiResponse<Product>>(`products/${id}`, p)
}

export const addProduct = (p: Product): Promise<AxiosResponse<ApiResponse<Product>>> => {
    //{ "message":"", "data":[{},{},..]|null}
    return axiosInstance.post<ApiResponse<Product>>(`products`)
}