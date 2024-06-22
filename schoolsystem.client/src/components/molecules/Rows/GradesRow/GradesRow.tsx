import './GradesRow.css'

import { FC, memo, ReactNode } from 'react'

import { GradesCell } from '@components/atoms/Cells/GradesCell/GradesCell'

interface GradesRowProps {
  cells: ReactNode[]
}

export const GradesRow: FC<GradesRowProps> = memo(({ cells }) => {
  return (
    <div className="grades-row">
      {cells.map((cell, index) => (
        <GradesCell key={index} content={cell} />
      ))}
    </div>
  )
})
