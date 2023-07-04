import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePoke } from '../context/poke.context'
function Content() {

  const { getPokemon, pokemon, charge, firtLetterUP } = usePoke()
  const [color, setcolor] = useState("")
  const { id } = useParams()



  useEffect(() => {
    getPokemon(id)

  }, [])

  if (charge) return <div className='text-4xl font-semibold text-center'>Loading...</div>
  return (
    <main className={`container  max-w-5xl w-full mx-auto`}>
      {console.log(pokemon.color)}
      <section className={`flex items-center justify-center gap-10 py-16 grass bg-path`}>

        <div className='flex  items-center justify-center bg-gray-300 rounded-full'> 
          <img width={300} src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className='flex flex-col items-start  '>
          <h2 className='text-4xl font-semibold text-white'>{firtLetterUP(pokemon.name)}</h2>
          <div>
            <p className='text-lg text-gray-300 py-1'>{pokemon.description.nick}</p>
            <p>
              {pokemon.types.map((data, index) => <span className='mr-2 bg-gray-400 rounded-full px-1' key={index}>{data.name}</span>)}
            </p>
            <p>
              {pokemon.description.description}
            </p>
          </div>
        </div>
      </section>
      <div className='separator'></div>
      <section className='flex items-center justify-center gap-5'>
        <img src={pokemon.evolutions.first.image} alt="" />
        <div className='flex '>
          {pokemon.evolutions.intermediare?.map((data, index) => <img key={index} src={data.image} />)}
        </div>
        <img src={pokemon.evolutions.finally.image} alt="" />
      </section>
    </main>
  )
}

export default Content