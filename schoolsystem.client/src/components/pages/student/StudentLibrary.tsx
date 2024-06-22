import { FC, memo } from 'react'

import { useAppSelector } from '@app/hooks.ts'

import useDocumentTitle from '@hooks/useDocumentTitle'
import useBorrowedBooks from '@hooks/useBorrowedBooks.ts'
import useBooks from '@hooks/useBooks.ts'

import { BooksList } from '@components/organisms/Lists/BookList/BookList.tsx'

export const StudentLibrary: FC = memo(() => {
  useDocumentTitle('School System | Library')
  const { studentId } = useAppSelector((state) => state.user.currentUser)
  const { borrowedBooks, handleBorrowBook } = useBorrowedBooks(studentId)
  const { books } = useBooks()

  const unborrowedBooks = books.filter(
    (book) => !borrowedBooks.some((borrowedBook) => borrowedBook.bookId === book.bookId),
  )

  return (
    <>
      <h1>Library</h1>
      <BooksList books={unborrowedBooks} handleClick={handleBorrowBook} />
    </>
  )
})
