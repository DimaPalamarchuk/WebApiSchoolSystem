import { useState, useEffect } from 'react'

import { BorrowedBook, getBorrowedBooksByStudentId, returnBook, borrowBook } from '@actions/books.ts'

function useBorrowedBooks(studentId: string | null) {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (typeof studentId === 'string') {
        try {
          const books = await getBorrowedBooksByStudentId(studentId)
          setBorrowedBooks(books)
        } catch (error) {
          console.error('Error fetching borrowed books:', error)
        }
      }
    }

    fetchBorrowedBooks()
  }, [studentId])

  const handleReturnBook = async (bookId: string): Promise<void> => {
    if (typeof studentId === 'string') {
      try {
        await returnBook(bookId, studentId)
        const updatedBooks = borrowedBooks.filter((book) => book.bookId !== bookId)
        setBorrowedBooks(updatedBooks)
      } catch (error) {
        console.error('Error returning book:', error)
      }
    }
  }

  const handleBorrowBook = async (bookId: string): Promise<void> => {
    if (typeof studentId === 'string') {
      try {
        await borrowBook(bookId, studentId)
        const updatedBooks = await getBorrowedBooksByStudentId(studentId)
        setBorrowedBooks(updatedBooks)
      } catch (error) {
        console.error('Error returning book:', error)
      }
    }
  }

  return {
    borrowedBooks,
    handleReturnBook,
    handleBorrowBook,
  }
}

export default useBorrowedBooks
