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
     {/*  <section className='flex items-center justify-center flex-col'>
        <h1 className='text-4xl py-5 font-semibold  text-white'>{pokemon.name}</h1>
        <img width={300} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
        <div className='py-3'>
          {pokemon.types.map((data, index) =>
            <span className='mx-2 text-lg font-sans' key={index}>
              {data.type.name}
            </span>
          )}
        </div>
      </section>
      <section>
            
      </section> */}
    </main>
  )
}

export default Content