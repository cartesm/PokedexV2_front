import React, { useState } from 'react'
import { BiLogOut, BiMenu, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
import { usePoke } from '../context/poke.context'
function Header() {

    const { isLoged, logout, userData } = useAuth()
    const { allPokemons } = usePoke()
    /*  - filtrar los datos y terminar el formulario
        - hcaer el menu mobil
        -mejorar registro y login
    */
    const [pokemonsFiltred, setPokemonsFiltred] = useState([])
    const [displayed, setDisplayed] = useState(false)

    const changeDisplay = () => displayed ? setDisplayed(false) : setDisplayed(true)
    return (
        <header className='bg-sky-800 relative items-center z-10 w-auto h-[50px] flex justify-around'>
            <Link to={"/"}>
                <h1 className='text-4xl font-semibold text-white'>
                    Simpledex
                </h1>
            </Link>
            <div>
                <form action="" className=''>
                    <input placeholder='Busca un pokemon' type="text" className='rounded-full outline-none px-3 py-1 caret-red-600' />
                </form>
                <div>

                </div>
            </div>
            {/* menu pc */}
            <ul className='gap-4 items-center md:flex hidden'>
                <li className=' liFather cursor-pointer'>
                    <BiUser className='text-2xl text-white' />
                    <ul className={`absolute flex-col z-20 hidden`} >

                        {
                            isLoged ? (
                                <>
                                    <li className='li-item'>
                                        <Link className='nav-links'
                                            to={"/favorites"} >Favorites</Link>
                                    </li>
                                    <li className='li-item'>
                                        <BiLogOut onClick={logout}
                                            className='text-white text-2xl' />
                                    </li></>
                            ) : undefined
                        }
                    </ul>
                </li>
                {!isLoged ? (<>
                    <li className='li-item'>
                        <Link className='nav-links'
                            to={"/login"}>Iniciar sesion</Link>
                    </li>
                    <li className='li-item'>
                        <Link className='nav-links'
                            to={"/register"}>Registrate</Link>
                    </li>
                </>) : undefined}
            </ul>

            <button className='md:hidden block'>
                <BiMenu className='text-3xl text-white' />
            </button>
            {/* seguir aqui */}
            <nav className='md:hidden w-1/2 flex z-20 absolute right-0 h-full bg-red-400'>
                <ul>
                    <li className='relative liFather'>
                        <BiUser className='text-2xl text-white' />
                        <ul className={`absolute z-20 items-center gap-10 hidden`} >

                            {
                                isLoged ? (
                                    <>
                                        <li className='li-item'>
                                            <Link className='nav-links'
                                                to={"/favorites"} >Favorites</Link>
                                        </li>
                                        <li className='li-item'>
                                            <BiLogOut onClick={logout}
                                                className='text-white text-2xl' />
                                        </li></>
                                ) : undefined
                            }
                        </ul>
                    </li>
                    {!isLoged ? (<>
                        <li className='li-item'>
                            <Link className='nav-links'
                                to={"/login"}>Iniciar sesion</Link>
                        </li>
                        <li className='li-item'>
                            <Link className='nav-links'
                                to={"/register"}>Registrate</Link>
                        </li>
                    </>) : undefined}
                </ul>
            </nav>
        </header>
    )
}

export default Header