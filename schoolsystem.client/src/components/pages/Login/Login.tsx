import './Login.css'

import { FC, memo, useState } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'
import { StandardButton } from '@components/atoms/Buttons/StandardButton/StandardButton'
import { LoginInput } from '@components/atoms/Inputs/LoginInput/LoginInput'
import { login } from '@actions/user'
import { useAppDispatch } from '@app/hooks'

export const Login: FC = memo(() => {
  useDocumentTitle('School System | Login')
  const [username, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()

  return (
    <div className="login">
      <div className="login__container">
        <h1>School System</h1>
        <LoginInput value={username} setValue={setLogin} type="text" placeholder="Login" />
        <LoginInput value={password} setValue={setPassword} type="password" placeholder="Password" />
        <StandardButton
          text="Sign in"
          onClick={async () => dispatch(await login(username, password))}
          width="100%"
          height="55px"
        />
      </div>
    </div>
  )
})
