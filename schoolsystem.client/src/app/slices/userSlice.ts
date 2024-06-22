import { RootState } from '@app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CurrentUser {
  username: string
  firstName: string
  lastName: string
  roleName: string
  employeeId: null | string
  studentId: null | string
}

interface UserSlice {
  currentUser: CurrentUser
  isAuth: boolean
}

const initialState: UserSlice = {
  currentUser: {
    username: '',
    firstName: '',
    lastName: '',
    roleName: '',
    employeeId: '',
    studentId: '',
  },
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload
      state.isAuth = true
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser
      state.isAuth = false
    },
  },
})

export const { setUser, logout } = userSlice.actions

export const selectUser = (state: RootState) => state

export default userSlice.reducer
