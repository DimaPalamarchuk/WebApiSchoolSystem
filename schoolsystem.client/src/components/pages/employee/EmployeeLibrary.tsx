import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'

export const EmployeeLibrary: FC = memo(() => {
  useDocumentTitle('School System | Library')

  return <h1>Employee Library</h1>
})
