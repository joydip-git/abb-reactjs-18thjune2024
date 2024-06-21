import { Product } from "../models/product"

export type ProducRecordsStateType = {
    fetchStatus: boolean,
    errorMessage: string,
    products: Product[]
}

export interface ProductStateType {
    fetchStatus: boolean,
    errorMessage: string,
    productInfo: Product | undefined
}