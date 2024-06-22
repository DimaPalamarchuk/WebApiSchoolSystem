import './Navbar.css'

import { FC, memo } from 'react'

import { NavbarLink, NavbarLinkProps } from '@components/atoms/NavbarLink/NavbarLink.tsx'
import { NavbarButton } from '@components/atoms/Buttons/NavbarButton/NavbarButton.tsx'
import { useAppDispatch, useAppSelector } from '@app/hooks.ts'
import { logout } from '@app/slices/userSlice.ts'

export const Navbar: FC = memo(() => {
  const { roleName } = useAppSelector((state) => state.user.currentUser)
  const dispatch = useAppDispatch()

  const studentLinks: NavbarLinkProps[] = [
    {
      to: '/personal-data',
      text: 'Personal data',
      icon: 'user',
    },
    {
      to: '/grades',
      text: 'Grades',
      icon: 'square-poll',
    },
    {
      to: '/my-books',
      text: 'My books',
      icon: 'book-open-reader',
    },
    {
      to: '/library',
      text: 'Library',
      icon: 'list',
    },
  ]

  const employeeLinks: NavbarLinkProps[] = [
    {
      to: '/personal-data',
      text: 'Personal data',
      icon: 'user',
    },
    {
      to: '/students',
      text: 'Students',
      icon: 'graduation-cap',
    },
    {
      to: '/library',
      text: 'Library',
      icon: 'list',
    },
  ]

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {(roleName === 'employee' ? employeeLinks : studentLinks).map(({ to, text, icon }, i) => {
          return (
            <li key={i}>
              <NavbarLink to={to} text={text} icon={icon} />
            </li>
          )
        })}
      </ul>
      <NavbarButton text="Exit" onClick={() => dispatch(logout())} icon="door-open" />
    </nav>
  )
})
