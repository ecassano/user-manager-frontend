import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from '../types/auth'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    user: null,
  } as AuthState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true
      state.user = action.payload
    },
    logout: state => {
      state.authenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
