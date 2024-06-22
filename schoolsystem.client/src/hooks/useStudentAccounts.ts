import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { getAllStudentAccounts, addStudentAccount, StudentAccounts } from '@actions/student-accounts.ts'

function useStudentAccounts() {
  const [studentAccounts, setStudentAccounts] = useState<StudentAccounts[]>()

  useEffect(() => {
    const fetchStudentAccounts = async () => {
      try {
        const studentsData = await getAllStudentAccounts()
        setStudentAccounts(studentsData)
      } catch (error) {
        console.error('Error fetching:', error)
      }
    }

    fetchStudentAccounts()
  }, [])

  const handleAddStudent = async (
    firstName: string,
    setFirstName: Dispatch<SetStateAction<string>>,
    lastName: string,
    setLastName: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    setSelectedStudentAccountUsername: Dispatch<SetStateAction<string>>,
  ): Promise<void> => {
    if (
      [firstName, lastName, password, username].every((str) => str.length > 3) &&
      !studentAccounts?.some((account) => account.username === username)
    ) {
      try {
        const newStudentAccount = await addStudentAccount(firstName, lastName, password, username)

        if (newStudentAccount) {
          setStudentAccounts([...(studentAccounts || []), newStudentAccount])
          setSelectedStudentAccountUsername(username)

          setFirstName('')
          setLastName('')
          setPassword('')
          setUsername('')
        }
      } catch (error) {
        console.error('Error adding book:', error)
      }
    }
  }

  return { studentAccounts, handleAddStudent }
}

export default useStudentAccounts
