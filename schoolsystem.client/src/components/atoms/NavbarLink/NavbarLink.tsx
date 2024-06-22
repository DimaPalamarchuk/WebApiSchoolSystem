import './NavbarLink.css'

import { FC, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserAlt,
  faSquarePollHorizontal,
  faBookOpenReader,
  faList,
  faDoorOpen,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'

export interface NavbarLinkProps {
  to: string
  text: string
  icon: 'user' | 'square-poll' | 'book-open-reader' | 'list' | 'door-open' | 'graduation-cap'
}

export const NavbarLink: FC<NavbarLinkProps> = memo(({ to, text, icon }) => {
  const { pathname } = useLocation()

  let faIcon
  switch (icon) {
    case 'user':
      faIcon = <FontAwesomeIcon icon={faUserAlt} size="lg" />
      break
    case 'square-poll':
      faIcon = <FontAwesomeIcon icon={faSquarePollHorizontal} size="lg" />
      break
    case 'book-open-reader':
      faIcon = <FontAwesomeIcon icon={faBookOpenReader} size="lg" />
      break
    case 'list':
      faIcon = <FontAwesomeIcon icon={faList} size="lg" />
      break
    case 'door-open':
      faIcon = <FontAwesomeIcon icon={faDoorOpen} size="lg" />
      break
    case 'graduation-cap':
      faIcon = <FontAwesomeIcon icon={faGraduationCap} size="lg" />
      break
  }

  return (
    <Link to={to} className={`navbar-link ${pathname === to && 'navbar-link-active'}`}>
      {faIcon}
      {text}
    </Link>
  )
})
