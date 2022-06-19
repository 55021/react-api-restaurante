import React from 'react'
import { Outlet } from 'react-router-dom'
import Appbar from '../../componentes/Appbar'

const PaginaBase = () => {
  return (
    <>
        <Appbar/>
        <Outlet/>
    </>
  )
}

export default PaginaBase