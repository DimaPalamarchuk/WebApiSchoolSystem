import './NavbarButton.css'

import { FC, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

interface NavbarButtonProps {
  text: string
  onClick: () => void
  icon: 'door-open'
}

export const NavbarButton: FC<NavbarButtonProps> = memo(({ text, onClick, icon }) => {
  let faIcon
  switch (icon) {
    case 'door-open':
      faIcon = <FontAwesomeIcon icon={faDoorOpen} size="lg" />
      break
  }

  return (
    <button className="navbar-button" onClick={onClick}>
      {faIcon}
      {text}
    </button>
  )
})
