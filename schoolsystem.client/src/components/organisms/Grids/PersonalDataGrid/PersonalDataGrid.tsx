import './PersonalDataGrid.css'

import { FC, memo } from 'react'

import { PersonalDataRow } from '@components/molecules/Rows/PersonalDataRow/PersonalDataRow'

interface PersonalDataGridProps {
  firstName: string
  lastName: string
  username: string
}

export const PersonalDataGrid: FC<PersonalDataGridProps> = memo(({ firstName, lastName, username }) => {
  return (
    <table>
      <tbody>
        <PersonalDataRow label="First Name" value={firstName} />
        <PersonalDataRow label="Last Name" value={lastName} />
        <PersonalDataRow label="Username" value={username} />
      </tbody>
    </table>
  )
})
