import React from 'react'
import { CgLogOut } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
function Header() {

    const { isLoged, logout, userData } = useAuth()

    return (
        <header className='bg-sky-800  w-auto mx-auto py-1 px-3 flex items-center justify-around'>
            <h1 className='text-4xl font-semibold text-white'>
                Simpledex
            </h1>
            <form action="">
                <input placeholder='Busca un pokemon' type="text" className='rounded-full outline-none px-3 py-1 caret-red-600' />
            </form>
            {/* hacer despues el icono del user */}
            <ul className='flex gap-4 items-center'>

                {
                    isLoged ? (
                        <>
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