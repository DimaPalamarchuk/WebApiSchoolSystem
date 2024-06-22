import './AddButton.css'

import { FC, memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const AddButton: FC = memo(() => {
  return (
    <button className="add-button">
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </button>
  )
})
