import React, { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
function Header() {

    const { isLoged, logout,userData } = useAuth()
    const [dataUser, setDataUser] = useState(null)
   useEffect(() => {
    const data = localStorage.getItem("userData")
    setDataUser(JSON.parse(data))
}, [])
   

    return (
        <header className='bg-[#0d5269] items-center z-10 w-auto h-[65px] flex justify-around'>
            <h1 className='text-3xl border-l-4 border-[#04edc9] pl-2 text-white font-bold'>
                <Link to={"/"} reloadDocument>
                    PokedexV2
                </Link>
            </h1>
            <nav>
                <ul className='flex text-white text-lg font-semibold gap-3'>
                    {isLoged ? (
                        <>
                            <li>
                                Hola <span className='font-bold text-[#04edc9]'>{dataUser.userName}</span>!
                            </li>
                            <li className='text-white cursor-pointer font-semibold hover:underline'>
                                <Link to={"/favorites"} reloadDocument>Favoritos</Link>
                            </li>
                            <li className='text-white font-semibold cursor-pointer hover:underline'
                                onClick={logout}>
                                <div className='flex gap-1 items-center justify-center'>
                                    <BiLogOut className='text-xl' />
                                    <span>Sing Out</span>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='text-white font-semibold cursor-pointer hover:underline'>
                                <Link to={"/login"}>
                                    Iniciar Sesion
                                </Link>
                            </li>
                            <li className='text-white font-semibold cursor-pointer hover:underline'>
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