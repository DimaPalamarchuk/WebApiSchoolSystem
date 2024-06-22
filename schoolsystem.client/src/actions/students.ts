import axios from 'axios'

export interface Student {
  studentId: string
  userId: string
}

export interface StudentAccount extends Student {
  firstName: string
  lastName: string
  username: string
}

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await axios.get('https://localhost:7045/api/Students/All students')

    return response.data.map((item: any) => ({
      studentId: item.studentId,
      userId: item.userId,
    })) as Student[]
  } catch (error) {
    console.error('Error fetching:', error)
    return []
  }
}

export const addStudent = async (
  firstName: string,
  lastName: string,
  password: string,
  username: string,
): Promise<StudentAccount | undefined> => {
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
    } as StudentAccount
  } catch (error) {
    console.error('Error fetching:', error)
  }
}
