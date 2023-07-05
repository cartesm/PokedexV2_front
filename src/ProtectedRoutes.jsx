import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './context/auth.context'
function ProtectedRoutes() {

    const navigate = useNavigate()
    const {isLoged} = useAuth()
   
    if (!isLoged) return navigate("/")

    return <Outlet />
}

export default ProtectedRoutes