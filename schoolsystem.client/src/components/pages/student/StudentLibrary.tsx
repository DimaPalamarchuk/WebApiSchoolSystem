import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'

export const StudentLibrary: FC = memo(() => {
  useDocumentTitle('School System | Library')

  return <h1>Student Library</h1>
})
