import './PersonalDataRow.css'

import { FC, memo } from 'react'

import { PersonalDataCell } from '@components/atoms/Cells/PersonalDataCell/PersonalDataCell'

interface PersonalDataRowProps {
  label: string
  value: string
}

export const PersonalDataRow: FC<PersonalDataRowProps> = memo(({ label, value }) => {
  return (
    <tr>
      <PersonalDataCell content={label} />
      <PersonalDataCell content={value} />
    </tr>
  )
})
