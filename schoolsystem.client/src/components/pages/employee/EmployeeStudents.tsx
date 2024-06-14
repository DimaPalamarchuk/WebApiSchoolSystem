import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'

export const EmployeeStudents: FC = memo(() => {
  useDocumentTitle('School System | Students')

  return <h1>Employee Students</h1>
})
