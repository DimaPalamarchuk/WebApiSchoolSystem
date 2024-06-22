import { FC, memo } from 'react'

import { useAppSelector } from '@app/hooks.ts'

import useDocumentTitle from '@hooks/useDocumentTitle'
import useBorrowedBooks from '@hooks/useBorrowedBooks.ts'

import { BooksList } from '@components/organisms/Lists/BookList/BookList.tsx'

export const StudentMyBooks: FC = memo(() => {
  useDocumentTitle('School System | My Books')
  const { studentId } = useAppSelector((state) => state.user.currentUser)
  const { borrowedBooks, handleReturnBook } = useBorrowedBooks(studentId)

  return (
    <>
      <h1>My Books</h1>
      <BooksList books={borrowedBooks} handleClick={handleReturnBook} />
    </>
  )
})
