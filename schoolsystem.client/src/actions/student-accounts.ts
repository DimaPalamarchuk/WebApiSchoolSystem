import axios from 'axios'

interface User {
  userId: string
  firstName: string
  lastName: string
  username: string
}

interface Student {
  studentId: string
  userId: string
}

export type StudentAccounts = User & Student

export const getAllStudentAccounts = async (): Promise<StudentAccounts[]> => {
  try {
    const students = await axios.get('https://localhost:7045/api/Students/All students')
    const users = await axios.get('https://localhost:7045/api/Users')

    return students.data
      .map((student: Student) => {
        const user = users.data.find((user: User) => user.userId === student.userId)
        return user
          ? {
              studentId: student.studentId,
              userId: student.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
            }
          : null
      })
      .filter((studentAccount: StudentAccounts) => studentAccount !== null) as StudentAccounts[]
  } catch (error) {
    console.error('Error fetching:', error)
    return []
  }
}

export const addStudentAccount = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
): Promise<StudentAccounts | undefined> => {
  try {
    const response = await axios.post(
      `https://localhost:7045/api/Users/${username},${password},${firstName},${lastName},student`,
    )

    return {
      studentId: response.data.studentId,
      userId: response.data.userId,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      username: response.data.username,
    } as StudentAccounts
  } catch (error) {
    console.error('Error fetching:', error)
  }
}
