import './LoginForm.css'

import { FC, FormEvent, memo, useState } from 'react'

import { useAppDispatch } from '@app/hooks.ts'

import { login } from '@actions/users.ts'

import { Input } from '@components/atoms/Input/Input.tsx'
import { StandardButton } from '@components/atoms/Buttons/StandardButton/StandardButton.tsx'

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
      <Input value={username} setValue={setLogin} type="text" placeholder="Login" />
      <Input value={password} setValue={setPassword} type="password" placeholder="Password" />
      <StandardButton text="Sign in" width="100%" height="55px" />
    </form>
  )
})
