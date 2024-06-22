import axios from 'axios'

export interface Grade {
  subjectName: string
  firstTermin: number
  secondTermin: number
}

export const getGradesByStudentId = async (studentId: string): Promise<Grade[]> => {
  try {
    const response = await axios.get(`https://localhost:7045/api/grades/getgradesbystudentid/${studentId}`)
    return response.data.map((grade: any) => ({
      subjectName: grade.subject.subjectName,
      firstTermin: grade.firstTermin,
      secondTermin: grade.secondTermin,
    })) as Grade[]
  } catch (error) {
    alert((error as Error).message)
    return []
  }
}
