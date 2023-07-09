import React, { useEffect, useState } from 'react'
import { BiStar } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import Image from '../components/ImagePrecharge'
import { useAuth } from '../context/auth.context'
import { usePoke } from '../context/poke.context'
function Content() {

  const { favorites, favoritesData, isLoged } = useAuth()
  const { getPokemon, pokemon, charge, firtLetterUP, addFav, deleteFav } = usePoke()

  const { id } = useParams()
  const maxValues = [714, 526, 658, 535, 658, 548];
  const [isFavorite, setIsFavorite] = useState(false)



  useEffect(() => {
    localStorage.getItem("userData") ? favorites() : undefined
    getPokemon(id)
  }, [])

  useEffect(() => {
    favoritesData.find(data => data.id == pokemon.id? setIsFavorite(true) : setIsFavorite(false))
  }, [deleteFav, addFav])


  if (charge) return <div className='text-4xl h-screen bg-slate-400 mx-auto max-w-5xl w-full font-semibold flex-col flex items-center justify-center'>
    <span className='lds-dual-ring rounded-full bg-slate-500'></span>
    <span className='text-2xl text-[#181818]'>Cargando..</span>
  </div>

  return (
    <main className={`container bg-[#103a55] main-content max-w-5xl w-full mx-auto`}>
      <section className={`flex md:flex-row flex-col items-center justify-center gap-10 py-16  `}>

        <div className='flex  items-center justify-center bg-slate-300 rounded-full'>
          <Image width={300} url={pokemon.image} alt={pokemon.name} />
        </div>
        <div className='flex flex-col items-center text-center md:text-start md:items-start  '>
          <h2 className='text-4xl font-semibold text-[#04edc9]'>{firtLetterUP(pokemon.name)} <span className='text-3xl'>#{pokemon.id}</span></h2>
          <div>
            <p className='text-lg text-[#08acaa] py-1'>{pokemon.description.nick}</p>
            <p className='my-1'>
              {pokemon.types.map((data, index) => <span className='mr-2 bg-gray-400 rounded-full px-1' key={index}>{data.name}</span>)}
            </p>
            <p className='text-gray-200 text-lg max-w-sm w-full'>
              {pokemon.description.description}
            </p>
            {isLoged ?
              <BiStar className={` ${isFavorite ? "text-yellow-300" : "text-white"} cursor-pointer text-xl`} onClick={_ => {
                !isFavorite ? addFav({ id: pokemon.id, name: pokemon.name }) : deleteFav(pokemon.id)
                isFavorite ? setIsFavorite(false) : setIsFavorite(true)
              }} /> : undefined}
          </div>
        </div>
      </section>
      {/* stats */}
      <section className='stats'>

        <h3 className='text-4xl text-center pt-8 text-white font-bold'>Estadisticas</h3>
        <div className='py-10'>
          {pokemon.stats.map((data, index) => <div className=' flex items-center max-w-lg mx-auto justify-end gap-3' key={index}>
            <span className='text-gray-200 text-start block max-w-[250px] w-full text-2xl py-1'>{data.name}</span>
            <div className='w-[300px] flex justify-start h-[25px] bg-[#103a55] rounded-full'>
              <div className={`bg-[#08acaa] rounded-full text-center text-gray-800 font-semibold text-lg h-full`}
                style={{ width: Math.round((data.stat * 100) / maxValues[index]) * 6 }}>
                {data.stat}
              </div>
            </div>
          </div>)}
        </div>
      </section>
      {/* habilidades */}
      <section>
        <h3 className='text-3xl font-bold text-white text-center my-7 '>Habilidades</h3>
        <div className='max-w-2xl w-full px-5 mx-auto grid grid-cols-1  md:grid-cols-3 gap-3 place-items-center'>
          {pokemon.abilities.map((data, index) => <div
            className=' rounded-2xl bg-gray-900 bg-opacity-60 p-4 max-w-xs'
            key={index}>
            <span className='py-3 text-xl text-[#04edc9] font-semibold '>
              {data.name}
            </span>
            <p className='text-gray-300'>
              {data.description}
            </p>
          </div>)}
        </div>
      </section>
      <section className='flex flex-col items-center justify-center'>
        <h3 className='text-center text-3xl pt-10 pb-6 font-bold text-white'>
          Mobimientos que
          <span className='underline mx-2 text-[#04edc9]'>
            {firtLetterUP(pokemon.name)} <br />
          </span>
          puede aprender.
        </h3>

        <div className='max-h-[400px] w-full max-w-xl rounded-md px-3 py-2'>
          <div className='grid grid-cols-4 bg-slate-100 rounded-full px-3 font-semibold text-lg text-gray-600 text-center my-2 gap-5 '>
            <span>Nombre</span>
            <span>Tipo</span>
            <span>Potencia</span>
            <span>Presicion</span>
          </div>
          <div className='overflow-auto scrollbar-moves h-[300px]'>
            {pokemon.moves.map((data, index) => <div className='grid nth-moves rounded-md bg-[#0d5269] grid-cols-4 
            text-center my-2 gap-y-2 '
              key={index}>
              <span className={` w-[100px] md:w-[150px] text-slate-100 font-semibold px-2 rounded-full`}>{data.name ? data.name : "???"}</span>
              <span className="text-white">{data.type}</span>
              <span>{!data.power ? "---" : data.power}</span>
              <span>{!data.accuracy ? "---" : data.accuracy}</span>
              <p className='text-center px-3 text-slate-300 -mt-1 mb-2 col-span-4'>{data.description}</p>
            </div>)}
          </div>
        </div>
      </section>
      {/* evoluciones */}
      <section className='pb-10'>
        <h3 className='text-3xl font-bold text-white text-center mt-16 '>Evoluciones</h3>
        <div className='flex items-center justify-center  my-10'>
          <Link to={`/pokemon/${pokemon.evolutions.first.name}`} target='_blank' className='text-center'>
            <div className='flex flex-col items-center justify-center'>
              <img src={pokemon.evolutions.first.image} alt={pokemon.evolutions.first.name} />
              <span className='text-white font-semibold text-lg'>{pokemon.evolutions.first.name}</span>
            </div>
          </Link>
          <div>
            {pokemon.evolutions.intermediare?.map((data, index) => <Link target='_blank' to={`/pokemon/${data.name}`} className='text-center' key={index}>
              <div className='flex flex-col items-center justify-center'>
                <img alt={data.name} src={data.image} />
                <span className='text-white font-semibold text-lg'>{data.name}</span>
              </div>
            </Link>)}
          </div>
          {pokemon.evolutions.finally.image ? <Link to={`/pokemon/${pokemon.evolutions.finally.name}`} target='_blank' className='text-center'>
            <div className='flex flex-col items-center justify-center'>
              <Image url={pokemon.evolutions.finally?.image} alt={pokemon.evolutions.finally?.name} />
              <span className='text-white font-semibold text-lg'>{pokemon.evolutions.finally?.name}</span>
            </div>
          </Link> : undefined}
        </div>
      </section>
    </main>
  )
}

export default Content