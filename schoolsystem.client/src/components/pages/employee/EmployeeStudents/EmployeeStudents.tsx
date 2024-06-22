import './EmployeeStudents.css'

import { ChangeEvent, FC, FormEvent, memo, useEffect, useState } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'
import useGrades from '@hooks/useGrades.ts'
import useBorrowedBooks from '@hooks/useBorrowedBooks.ts'

import { StudentAccount } from '@actions/students.ts'

import UseStudentAccounts from '@hooks/useStudentAccounts.ts'

import { Input } from '@components/atoms/Input/Input.tsx'
import { StandardButton } from '@components/atoms/Buttons/StandardButton/StandardButton.tsx'
import { PersonalDataGrid } from '@components/organisms/Grids/PersonalDataGrid/PersonalDataGrid.tsx'
import { GradesGrid } from '@components/organisms/Grids/GradesGrid/GradesGrid.tsx'
import { BooksList } from '@components/organisms/Lists/BookList/BookList.tsx'

export const EmployeeStudents: FC = memo(() => {
  useDocumentTitle('School System | Students')
  const [newStudentFirstName, setNewStudentFirstName] = useState<string>('')
  const [newStudentLastName, setNewStudentLastName] = useState<string>('')
  const [newStudentPassword, setNewStudentPassword] = useState<string>('')
  const [newStudentUsername, setNewStudentUsername] = useState<string>('')
  const [selectedStudentAccountUsername, setSelectedStudentAccountUsername] = useState<string>('')
  const [selectedStudentAccount, setSelectedStudentAccount] = useState<StudentAccount>()
  const { studentAccounts, handleAddStudent } = UseStudentAccounts()

  useEffect(() => {
    if (studentAccounts) {
      if (selectedStudentAccountUsername) {
        setSelectedStudentAccount(studentAccounts.find(({ username }) => username === selectedStudentAccountUsername))
      } else {
        setSelectedStudentAccountUsername(studentAccounts[0].username)
        setSelectedStudentAccount(studentAccounts[0])
      }
    }
  }, [studentAccounts])

  useEffect(() => {
    if (selectedStudentAccount && studentAccounts) {
      const account = studentAccounts.find(({ username }) => username === selectedStudentAccountUsername)
      setSelectedStudentAccount(account)
    }
  }, [selectedStudentAccountUsername])

  const grades = useGrades(selectedStudentAccount ? selectedStudentAccount.studentId : null)
  const { borrowedBooks, handleReturnBook } = useBorrowedBooks(
    selectedStudentAccount ? selectedStudentAccount.studentId : null,
  )

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudentAccountUsername(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddStudent(
      newStudentFirstName,
      setNewStudentFirstName,
      newStudentLastName,
      setNewStudentLastName,
      newStudentPassword,
      setNewStudentPassword,
      newStudentUsername,
      setNewStudentUsername,
      setSelectedStudentAccountUsername,
    )
  }

  return (
    <>
      <h1>Students</h1>
      <div className="students">
        <div className="students-add-new">
          <h2>Add new student</h2>
          <form className="students-form" onSubmit={handleSubmit}>
            <Input value={newStudentFirstName} setValue={setNewStudentFirstName} type="text" placeholder="First name" />
            <Input value={newStudentLastName} setValue={setNewStudentLastName} type="text" placeholder="Last name" />
            <Input value={newStudentPassword} setValue={setNewStudentPassword} type="text" placeholder="Password" />
            <Input value={newStudentUsername} setValue={setNewStudentUsername} type="text" placeholder="Username" />
            <StandardButton text="Add student" width="100%" height="55px" />
          </form>
        </div>
        <div className="students-info">
          <h2>Student Info</h2>
          <select value={selectedStudentAccountUsername} onChange={handleChange}>
            {studentAccounts?.map(({ username }, index) => <option key={index}>{username}</option>)}
          </select>
          <h3>Personal data</h3>
          <PersonalDataGrid
            firstName={selectedStudentAccount?.firstName || ''}
            lastName={selectedStudentAccount?.lastName || ''}
            username={selectedStudentAccount?.username || ''}
          />
          <h3>Grades</h3>
          <GradesGrid grades={grades} />
          <h3>Books</h3>
          <BooksList books={borrowedBooks} handleClick={handleReturnBook} />
        </div>
      </div>
    </>
  )
})
