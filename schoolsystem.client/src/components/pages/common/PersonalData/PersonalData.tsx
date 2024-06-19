import './PersonalData.css'

import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'
import { useAppSelector } from '@app/hooks.ts'

export const PersonalData: FC = memo(() => {
  useDocumentTitle('School System | Personal Data')
  const { firstName, lastName, username } = useAppSelector((state) => state.user.currentUser)

  return (
    <>
      <h1>Personal Data</h1>
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{username}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
})
