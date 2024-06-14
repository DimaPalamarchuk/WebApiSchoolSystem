import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'

export const StudentGrades: FC = memo(() => {
  useDocumentTitle('School System | Grades')

  return <h1>Student Grades</h1>
})
