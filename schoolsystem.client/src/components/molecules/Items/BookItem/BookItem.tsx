import './BookItem.css'

import { FC, memo } from 'react'

import { DeleteButton } from '@components/atoms/Buttons/DeleteButton/DeleteButton'

interface BookItemProps {
  title: string
  bookId: string
  handleClick: (bookId: string) => void
}

export const BookItem: FC<BookItemProps> = memo(({ title, bookId, handleClick }) => {
  return (
    <li className="book-item">
      {title}
      <DeleteButton handleClick={() => handleClick(bookId)} />
    </li>
  )
})
