import { useState, useEffect } from 'react'

import { getGradesByStudentId, Grade } from '@actions/grades.ts'

function useGrades(studentId: string | null) {
  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    const fetchGrades = async () => {
      if (typeof studentId === 'string') {
        try {
          const gradesData = await getGradesByStudentId(studentId)
          setGrades(gradesData)
        } catch (error) {
          console.error('Error fetching grades:', error)
        }
      }
    }

    fetchGrades()
  }, [studentId])

  return grades
}

export default useGrades
