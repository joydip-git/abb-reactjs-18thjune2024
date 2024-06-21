import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProducRecordsStateType, ProductStateType } from "./statetypes";
import { Product } from "../models/product";

const productRecordsInitialState: ProducRecordsStateType = {
    fetchStatus: false,
    errorMessage: '',
    products: []
}

const productInfoInitialState: ProductStateType = {
    fetchStatus: false,
    errorMessage: '',
    productInfo: undefined
}

const productRecordsSlice = createSlice({
    name: 'products',
    initialState: productRecordsInitialState,
    reducers: {
        fetchProductsInitiate: (state) => {
            state.errorMessage = ''
            state.fetchStatus = false
            state.products = []
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.errorMessage = ''
            state.fetchStatus = true
            state.products = action.payload
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
            state.fetchStatus = true
            state.products = []
        }
    }
})

const productInfoSlice = createSlice({
    name: 'product',
    initialState: productInfoInitialState,
    reducers: {
        fetchProductInitiate: (state) => {
            state.errorMessage = ''
            state.fetchStatus = false
            state.productInfo = undefined
        },
        fetchProductSuccess: (state, action: PayloadAction<Product>) => {
            state.errorMessage = ''
            state.fetchStatus = true
            state.productInfo = action.payload
        },
        fetchProductFailure: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
            state.fetchStatus = true
            state.productInfo = undefined
        }
    }
})

export const { fetchProductsInitiate, fetchProductsSuccess, fetchProductsFailure } = productRecordsSlice.actions

export const { fetchProductInitiate, fetchProductSuccess, fetchProductFailure } = productInfoSlice.actions

export const productRecordsReducer = productRecordsSlice.reducer
export const productInfoReducer = productInfoSlice.reducer

