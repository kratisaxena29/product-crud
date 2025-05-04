// import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// interface User {
//   id: number
//   username: string
//   email: string
//   firstName: string
//   lastName: string
//   image: string
// }

// interface AuthState {
//   user: User | null
//   accessToken: string | null
//   refreshToken: string | null
//   isAuthenticated: boolean
//   isLoading: boolean
//   error: string | null
// }

// const initialState: AuthState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// }

// // Check if we're in a browser environment and try to load from localStorage
// if (typeof window !== "undefined") {
//   const storedUser = localStorage.getItem("user")
//   const storedToken = localStorage.getItem("accessToken")
//   const storedRefreshToken = localStorage.getItem("refreshToken")

//   if (storedUser && storedToken) {
//     initialState.user = JSON.parse(storedUser)
//     initialState.accessToken = storedToken
//     initialState.refreshToken = storedRefreshToken
//     initialState.isAuthenticated = true
//   }
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
//       state.user = action.payload.user
//       state.accessToken = action.payload.accessToken
//       state.refreshToken = action.payload.refreshToken
//       state.isAuthenticated = true
//       state.error = null

//       // Save to localStorage
//       if (typeof window !== "undefined") {
//         localStorage.setItem("user", JSON.stringify(action.payload.user))
//         localStorage.setItem("accessToken", action.payload.accessToken)
//         localStorage.setItem("refreshToken", action.payload.refreshToken)
//       }
//     },
//     logout: (state) => {
//       state.user = null
//       state.accessToken = null
//       state.refreshToken = null
//       state.isAuthenticated = false

//       // Clear localStorage
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("user")
//         localStorage.removeItem("accessToken")
//         localStorage.removeItem("refreshToken")
//       }
//     },
//     updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
//       state.accessToken = action.payload.accessToken
//       state.refreshToken = action.payload.refreshToken

//       // Update localStorage
//       if (typeof window !== "undefined") {
//         localStorage.setItem("accessToken", action.payload.accessToken)
//         localStorage.setItem("refreshToken", action.payload.refreshToken)
//       }
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload
//     },
//   },
// })

// export const { login, logout, updateTokens, setError } = authSlice.actions
// export default authSlice.reducer


// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      state.error = null

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        localStorage.setItem("accessToken", action.payload.accessToken)
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      }
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null

      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      }
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken)
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    rehydrate: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    },
  },
})

export const { login, logout, updateTokens, setError, rehydrate } = authSlice.actions
export default authSlice.reducer

