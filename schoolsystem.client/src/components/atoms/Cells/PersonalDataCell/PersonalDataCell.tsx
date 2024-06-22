import './PersonalDataCell.css'

import { FC, memo, ReactNode } from 'react'

interface PersonalDataCellProps {
  content: ReactNode
}

export const PersonalDataCell: FC<PersonalDataCellProps> = memo(({ content }) => {
  return <td className="personal-data-cell">{content}</td>
})
