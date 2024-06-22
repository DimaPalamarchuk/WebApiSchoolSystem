import './GradesGrid.css'

import { FC, memo } from 'react'

import { Grade } from '@actions/grades.ts'

import { GradesRow } from '@components/molecules/Rows/GradesRow/GradesRow'

interface GradesGridProps {
  grades: Grade[]
}

export const GradesGrid: FC<GradesGridProps> = memo(({ grades }) => {
  return (
    <div className="grades-grid">
      <GradesRow cells={['Subject', ...grades.map((grade) => grade.subjectName)]} />
      <GradesRow cells={['I term', ...grades.map((grade) => grade.firstTermin)]} />
      <GradesRow cells={['II term', ...grades.map((grade) => grade.secondTermin || '-')]} />
    </div>
  )
})
