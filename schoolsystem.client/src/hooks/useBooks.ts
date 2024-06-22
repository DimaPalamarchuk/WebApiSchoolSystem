import { useState, useEffect, SetStateAction, Dispatch } from 'react'

import { getAllBooks, Book, deleteBook, addBook } from '@actions/books.ts'

function useBooks() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks()
        setBooks(booksData)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooks()
  }, [])

  const handleDeleteBook = async (bookId: string): Promise<void> => {
    try {
      await deleteBook(bookId)
      const updatedBooks = books.filter((book) => book.bookId !== bookId)
      setBooks(updatedBooks)
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const handleAddBook = async (title: string, setTitle: Dispatch<SetStateAction<string>>): Promise<void> => {
    if (title.length > 3) {
      try {
        const newBook = await addBook(title)
        if (newBook) {
          setBooks([...books, newBook])
          setTitle('')
        }
      } catch (error) {
        console.error('Error adding book:', error)
      }
    }
  }

  return {
    books,
    handleDeleteBook,
    handleAddBook,
  }
}

export default useBooks
