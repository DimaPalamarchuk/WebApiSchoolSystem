import './BookList.css'

import { FC, memo } from 'react'

import { BookItem } from '@components/molecules/Items/BookItem/BookItem'

interface BooksListProps {
  books: { title: string; bookId: string }[]
  handleClick: (bookId: string) => void
}

export const BooksList: FC<BooksListProps> = memo(({ books, handleClick }) => {
  if (!books.length) {
    return <span>No books borrowed</span>
  }

  return (
    <ul className="books-list">
      {books.map((book, index) => (
        <BookItem key={index} title={book.title} bookId={book.bookId} handleClick={handleClick} />
      ))}
    </ul>
  )
})
