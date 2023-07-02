import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePoke } from '../context/poke.context'
function Content() {

  const { getPokemon, pokemon, charge } = usePoke()
  const { id } = useParams()

  useEffect(() => {
    getPokemon(id)
  }, [])


  if (charge) return <div className='loader bg-red-600 mx-auto'></div>

  return (
    <main className='container max-w-5xl w-full mx-auto bg-gray-600'>
       <section className='flex items-center justify-center flex-col'>
        <h1 className='text-4xl py-5 font-semibold  text-white'>{pokemon.name}</h1>
        <img width={300} src={pokemon.image} alt={pokemon.name} />
        <div className='py-3'>
          {/* {pokemon.types.map((data, index) =>
            <span className='mx-2 text-lg font-sans' key={index}>
              {data.type.name}
            </span>
          )} */}
        </div>
        <p className='flex flex-col text-lg text-white items-center'>
          <span>{pokemon.description.nick}</span>
          {pokemon.description.description}
        </p>
      </section>
      <section className='flex gap-5'>
            <img src={pokemon.evolutions.first.image} alt="" />
            {pokemon.evolutions.intermediare?.map((data,index)=>{
              <img src={data.image} key={index} alt=''/>
            })}
            <img src={pokemon.evolutions.finally.image} alt="" />
      </section> 
    </main>
  )
}

export default Content