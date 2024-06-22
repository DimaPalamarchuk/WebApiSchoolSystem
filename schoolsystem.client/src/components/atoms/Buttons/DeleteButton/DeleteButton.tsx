import './DeleteButton.css'

import { FC, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface DeleteButtonProps {
  handleClick: () => void
}

export const DeleteButton: FC<DeleteButtonProps> = memo(({ handleClick }) => {
  return (
    <button onClick={handleClick} className="delete-button">
      <FontAwesomeIcon icon={faPlus} size="lg" transform={{ rotate: 45 }} />
    </button>
  )
})
