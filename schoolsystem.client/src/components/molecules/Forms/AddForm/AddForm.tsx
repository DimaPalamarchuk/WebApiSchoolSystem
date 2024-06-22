import './AddForm.css'

import { FC, FormEvent, memo } from 'react'

import { Input } from '@components/atoms/Input/Input.tsx'
import { AddButton } from '@components/atoms/Buttons/AddButton/AddButton.tsx'

interface AddFormProps {
  value: string
  setValue: (value: string) => void
  placeholder: string
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const AddForm: FC<AddFormProps> = memo(({ value, setValue, placeholder, handleSubmit }) => {
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <Input value={value} setValue={setValue} type="text" placeholder={placeholder} />
      <AddButton />
    </form>
  )
})
