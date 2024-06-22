import { FC, memo } from 'react'

import { useAppSelector } from '@app/hooks.ts'

import useDocumentTitle from '@hooks/useDocumentTitle'

import { PersonalDataGrid } from '@components/organisms/Grids/PersonalDataGrid/PersonalDataGrid.tsx'

export const PersonalData: FC = memo(() => {
  useDocumentTitle('School System | Personal Data')
  const { firstName, lastName, username } = useAppSelector((state) => state.user.currentUser)

  return (
    <>
      <h1>Personal Data</h1>
      <PersonalDataGrid firstName={firstName} lastName={lastName} username={username} />
    </>
  )
})
