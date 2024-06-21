import { configureStore } from "@reduxjs/toolkit";
import { productInfoReducer, productRecordsReducer } from "./reducers";
import { createLogger } from "redux-logger";

const appStore = configureStore({
    reducer: {
        productRecordsState: productRecordsReducer,
        productInfoState: productInfoReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(createLogger())
    }
})

export type AppStateType = ReturnType<typeof appStore.getState>
export default appStore