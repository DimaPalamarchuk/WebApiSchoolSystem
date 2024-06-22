import { FC, memo } from 'react'

import { useAppSelector } from '@app/hooks.ts'

import useDocumentTitle from '@hooks/useDocumentTitle'
import useGrades from '@hooks/useGrades.ts'

import { GradesGrid } from '@components/organisms/Grids/GradesGrid/GradesGrid.tsx'

export const StudentGrades: FC = memo(() => {
  useDocumentTitle('School System | Grades')
  const { studentId } = useAppSelector((state) => state.user.currentUser)
  const grades = useGrades(studentId)

  return (
    <>
      <h1>Grades</h1>
      <GradesGrid grades={grades} />
    </>
  )
})
