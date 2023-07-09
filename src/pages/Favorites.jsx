import React, { useEffect } from 'react'
import { BiTrash } from 'react-icons/bi'
import logo from '../assets/undraw_searching_re_3ra9.svg'
import { useAuth } from '../context/auth.context'
import { usePoke } from '../context/poke.context'
function Favorites() {

  const { favorites, favoritesData,} = useAuth()
  const {deleteFav} = usePoke()
  

  useEffect(() => {
    favorites()
  }, [])


  if (favoritesData.length === 0) return <main className='flex flex-col h-screen bg-[#103a55] max-w-5xl mx-auto items-center justify-center'>
    <img width={400} src={logo} />
    <h3 className='text-3xl font-bold text-white text-center'>No se encontraron favoritos.</h3>
  </main>

  return (<main className='main-content bg-[#103a55] h-screen max-w-5xl mx-auto'>
    <section className=''>
      <h3 className='text-3xl mx-6 my-4 mb-6 font-bold text-white'>Tus favoritos</h3>
      <div>
        {favoritesData.map((data, index) => <div className='my-2 mx-6 bg-slate-200 rounded-lg flex items-center justify-evenly h-[60px] ' key={index}>
          <span className='mx-6 text-[#181818] font-bold text-lg'>#{index + 1}</span>
          <div className='flex items-center'>
            <span className='text-xl font-semibold text-[#08acaa]'>{data.name}</span>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`} alt="" />
            <p onClick={()=>{
              deleteFav(data.id)
              window.location.reload()
            }} className='text-indigo-600 flex items-center justify-center hover:cursor-pointer hover:scale-110 duration-150'>
               <BiTrash />
              <span>Eliminar</span>
            </p>
          </div>
        </div>)}
      </div>
    </section>
  </main>
  )
}

export default Favorites