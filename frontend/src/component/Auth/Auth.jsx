import React from 'react'

import { Outlet } from 'react-router-dom'
const Auth = () => {
  return (
    <>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Auth