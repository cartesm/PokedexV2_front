import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
function Header() {

    const { isLoged, logout,userData } = useAuth()
    /*  - filtrar los datos y terminar el formulario
        - hcaer el menu mobil
    */

    return (
        <header className='bg-sky-800 relative items-center z-10 w-auto h-[65px] flex justify-around'>
            <h1 className='text-3xl text-white font-bold'>
                <Link to={"/"} reloadDocument>
                    PokedexV2
                </Link>
            </h1>
            <nav>
                <ul className='flex text-white font-semibold gap-3'>
                    {isLoged ? (
                        <>
                            <li>
                            </li>
                            <li className='text-white cursor-pointer font-semibold hover:text-blue-500'>
                                <Link to={"/favorites"} reloadDocument>Favoritos</Link>
                            </li>
                            <li className='text-white font-semibold cursor-pointer hover:text-blue-500'
                                onClick={logout}>
                                <div className='flex gap-1 items-center justify-center'>
                                    <BiLogOut className='text-xl' />
                                    <span>Sing Out</span>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to={"/login"}>
                                    Iniciar Sesion
                                </Link>
                            </li>
                            <li>
                                <Link to={"/register"}>
                                    Registrate
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header