import { FC, memo } from 'react'

import { Navbar } from '@components/molecules/Navbar/Navbar.tsx'

export const Header: FC = memo(() => {
  return (
    <>
      <Navbar />
    </>
  )
})
