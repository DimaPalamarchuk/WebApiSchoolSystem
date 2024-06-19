import './StandardButton.css'

import { FC, memo } from 'react'

interface StandardButtonProps {
  text: string
  onClick?: () => void
  width: string
  height: string
}

export const StandardButton: FC<StandardButtonProps> = memo(({ text, onClick, width, height }) => {
  return (
    <button className="standard-button" onClick={onClick} style={{ width, height }}>
      {text}
    </button>
  )
})
