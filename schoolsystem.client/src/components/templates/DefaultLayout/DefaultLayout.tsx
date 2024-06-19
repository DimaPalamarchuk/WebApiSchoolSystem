import './DefaultLayout.css'

import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@components/organisms/Header/Header'

export const DefaultLayout: FC = memo(() => {
  return (
    <div className="default-layout">
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  )
})
