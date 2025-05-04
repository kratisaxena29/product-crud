import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import productReducer from "./features/products/productSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
