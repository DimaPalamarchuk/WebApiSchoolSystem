import axios from 'axios'

import { store } from '@app/store'
import { setUser } from '@app/slices/userSlice'

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
