import './GradesCell.css'

import { FC, memo, ReactNode } from 'react'

interface GradesCellProps {
  content: ReactNode
}

export const GradesCell: FC<GradesCellProps> = memo(({ content }) => {
  return <div className="grades-cell">{content}</div>
})
