import React from 'react'
import { CgLogOut } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
function Header() {

    const { isLoged, logout, userData } = useAuth()

    return (
        <header className='bg-sky-950 max-w-5xl w-auto mx-auto py-1 px-3 flex items-center justify-around'>
            <h1 className='text-4xl font-semibold text-white'>
                SimplePokedex V2
            </h1>
            <ul className='flex gap-4 items-center'>

                {
                    isLoged ? (
                        <>
                            <h2 className='text-2xl text-sky-600 font-semibold'>hola { userData.userName}</h2>
                            <li>
                                <Link className='nav-links'
                                    to={"/favorites"} >Favorites</Link>
                            </li>
                            <li>
                                <CgLogOut onClick={logout}
                                    className='text-white text-2xl' />
                            </li></>
                    ) : (
                        <>
                            <li>
                                <Link className='nav-links'
                                    to={"/login"}>Iniciar sesion</Link>
                            </li>
                            <li>
                                <Link className='nav-links'
                                    to={"/register"}>Registrate</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </header>
    )
}

export default Header