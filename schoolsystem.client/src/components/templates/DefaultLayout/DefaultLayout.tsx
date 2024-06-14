import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@components/organisms/Header/Header'

export const DefaultLayout: FC = memo(() => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
})
