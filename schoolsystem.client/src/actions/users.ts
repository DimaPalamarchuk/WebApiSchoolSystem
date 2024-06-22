import axios from 'axios'

import { store } from '@app/store'
import { setUser } from '@app/slices/userSlice'

export interface User {
  userId: string
  username: string
  firstName: string
  lastName: string
  roleName: string
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://localhost:7045/api/Users')

    return response.data.map((item: any) => ({
      userId: item.userId,
      username: item.username,
      firstName: item.firstName,
      lastName: item.lastName,
      roleName: item.roleName,
    })) as User[]
  } catch (error) {
    console.error('Error fetching:', error)
    return []
  }
}

export const login = async (username: string, password: string) => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      const response = await axios.get('https://localhost:7045/api/login', {
        params: {
          username: username,
          pass: password,
        },
      })
      dispatch(setUser(response.data))
    } catch (error) {
      alert((error as Error).message)
    }
  }
}
