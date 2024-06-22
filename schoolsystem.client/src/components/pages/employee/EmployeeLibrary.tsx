import { FC, FormEvent, memo, useState } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'
import useBooks from '@hooks/useBooks.ts'

import { AddForm } from '@components/molecules/Forms/AddForm/AddForm.tsx'
import { BooksList } from '@components/organisms/Lists/BookList/BookList.tsx'

export const EmployeeLibrary: FC = memo(() => {
  useDocumentTitle('School System | Library')
  const [title, setTitle] = useState<string>('')
  const { books, handleDeleteBook, handleAddBook } = useBooks()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddBook(title, setTitle)
  }

  return (
    <>
      <h1>Library</h1>
      <AddForm value={title} setValue={setTitle} placeholder="New book" handleSubmit={handleSubmit} />
      <BooksList books={books} handleClick={handleDeleteBook} />
    </>
  )
})
