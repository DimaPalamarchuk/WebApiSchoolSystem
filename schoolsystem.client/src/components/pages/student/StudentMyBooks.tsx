import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'

export const StudentMyBooks: FC = memo(() => {
  useDocumentTitle('School System | My Books')

  return <h1>Student My Books</h1>
})
