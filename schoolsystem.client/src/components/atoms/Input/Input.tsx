import './Input.css'

import { FC, memo } from 'react'

interface InputProps {
  value: string
  setValue: (value: string) => void
  type: string
  placeholder: string
}

export const Input: FC<InputProps> = memo(({ value, setValue, type, placeholder }) => {
  return (
    <input
      className="input"
      onChange={(event) => setValue(event.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  )
})
