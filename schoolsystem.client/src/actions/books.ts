import axios from 'axios'

export interface Book {
  bookId: string
  title: string
}

export interface BorrowedBook extends Book {
  studentId: string
}

export const getBorrowedBooksByStudentId = async (studentId: string): Promise<BorrowedBook[]> => {
  try {
    const response = await axios.get(`https://localhost:7045/Get Borrowed Books By StudentId?studentId=${studentId}`)

    return response.data.map((item: any) => ({
      studentId: item.studentId,
      bookId: item.bookId,
      title: item.book.title,
    })) as BorrowedBook[]
  } catch (error) {
    console.error('Error fetching borrowed books:', error)
    return []
  }
}

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get('https://localhost:7045/All Title')

    return response.data.map((item: any) => ({
      bookId: item.bookId,
      title: item.title,
    })) as Book[]
  } catch (error) {
    console.error('Error fetching borrowed books:', error)
    return []
  }
}

export const returnBook = async (bookId: string, studentId: string): Promise<void> => {
  try {
    await axios.delete(`https://localhost:7045/Return a book?bookId=${bookId}&studentId=${studentId}`)
  } catch (error) {
    console.error('Error returning book:', error)
  }
}

export const borrowBook = async (bookId: string, studentId: string): Promise<void> => {
  try {
    await axios.post(`https://localhost:7045/api/Students/TakeBook?studentId=${studentId}&bookId=${bookId}`)
  } catch (error) {
    console.error('Error returning book:', error)
  }
}

export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    await axios.delete(`https://localhost:7045/Delete Book?bookId=${bookId}`)
  } catch (error) {
    console.error('Error returning book:', error)
  }
}

export const addBook = async (title: string): Promise<Book | undefined> => {
  try {
    const response = await axios.post(`https://localhost:7045/New Book?title=${title}`)
    return response.data
  } catch (error) {
    console.error('Error returning book:', error)
  }
}
