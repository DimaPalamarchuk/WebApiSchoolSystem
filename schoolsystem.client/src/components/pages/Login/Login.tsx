import './Login.css'

import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'
import { LoginForm } from '@components/molecules/Forms/LoginForm/LoginForm.tsx'

export const Login: FC = memo(() => {
  useDocumentTitle('School System | Login')
  return (
    <div className="login">
      <LoginForm />
    </div>
  )
})
