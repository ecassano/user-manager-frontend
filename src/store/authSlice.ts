import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../types/user'
interface AuthState {
  authenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.authenticated = true
      state.user = action.payload.user
    },
    logout: state => {
      state.authenticated = false
      state.user = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
