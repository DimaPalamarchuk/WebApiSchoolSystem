import './LoginForm.css'

import { FC, FormEvent, memo, useState } from 'react'

import { LoginInput } from '@components/atoms/Inputs/LoginInput/LoginInput.tsx'
import { StandardButton } from '@components/atoms/Buttons/StandardButton/StandardButton.tsx'
import { login } from '@actions/user.ts'
import { useAppDispatch } from '@app/hooks.ts'

export const LoginForm: FC = memo(() => {
  const [username, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(await login(username, password))
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <LoginInput value={username} setValue={setLogin} type="text" placeholder="Login" />
      <LoginInput value={password} setValue={setPassword} type="password" placeholder="Password" />
      <StandardButton text="Sign in" width="100%" height="55px" />
    </form>
  )
})
