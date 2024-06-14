import './LoginInput.css'

import { FC, memo } from 'react'

interface LoginInputProps {
  value: string
  setValue: (value: string) => void
  type: string
  placeholder: string
}

export const LoginInput: FC<LoginInputProps> = memo(({ value, setValue, type, placeholder }) => {
  return (
    <input
      className="login-input"
      onChange={(event) => setValue(event.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  )
})
