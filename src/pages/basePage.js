import React from 'react'
import BaseLayout from '../layouts/baseLayout'

export default function BasePage({children}) {
  return (
    <div>
        <BaseLayout>{children}</BaseLayout>
    </div>
  )
}
