import { FC, memo } from 'react'

import useDocumentTitle from '@hooks/useDocumentTitle'

export const PersonalData: FC = memo(() => {
  useDocumentTitle('School System | Personal Data')

  return <h1>Personal Data</h1>
})
