import { FC, memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '@components/templates/DefaultLayout/DefaultLayout'
import { PersonalData } from '@components/pages/common/PersonalData/PersonalData'
import { EmployeeLibrary } from '@components/pages/employee/EmployeeLibrary'
import { StudentLibrary } from '@components/pages/student/StudentLibrary'
import { StudentGrades } from '@components/pages/student/StudentGrades'
import { EmployeeStudents } from '@components/pages/employee/EmployeeStudents'
import { StudentMyBooks } from '@components/pages/student/StudentMyBooks'
import { Login } from '@components/pages/Login/Login'
import { useAppSelector } from '@app/hooks'

export const Router: FC = memo(() => {
  const { currentUser, isAuth } = useAppSelector((state) => state.user)

  const employeeRoutes = (
    <>
      <Route path="/library" element={<EmployeeLibrary />} />
      <Route path="/students" element={<EmployeeStudents />} />
    </>
  )

  const studentRoutes = (
    <>
      <Route path="/grades" element={<StudentGrades />} />
      <Route path="/library" element={<StudentLibrary />} />
      <Route path="/my-books" element={<StudentMyBooks />} />
    </>
  )

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/personal-data" element={<PersonalData />} />
          {currentUser.roleName === 'employee' ? employeeRoutes : studentRoutes}
          <Route path="*" element={<Navigate to="/personal-data" replace />} />
        </Route>
      </Routes>
    )
  }
})
