import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePoke } from '../context/poke.context'
function Content() {

  const { getPokemon, pokemon, charge, firtLetterUP } = usePoke()
  const [color, setcolor] = useState("")
  const { id } = useParams()
  const maxValues = [714, 526, 658, 535, 658, 548];

  
  
  


  useEffect(() => {
    getPokemon(id)

  }, [])

  if (charge) return <div className='text-4xl font-semibold text-center'>Loading...</div>
  return (
    <main className={`container  max-w-5xl w-full mx-auto`}>
      {console.log(pokemon.color)}
      <section className={`flex md:flex-row flex-col items-center justify-center gap-10 py-16 grass bg-path`}>

        <div className='flex  items-center justify-center bg-gray-300 rounded-full'>
          <img width={300} src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className='flex flex-col items-center text-center md:text-start md:items-start  '>
          <h2 className='text-4xl font-semibold text-white'>{firtLetterUP(pokemon.name)}</h2>
          <div>
            <p className='text-lg text-gray-300 py-1'>{pokemon.description.nick}</p>
            <p>
              {pokemon.types.map((data, index) => <span className='mr-2 bg-gray-400 rounded-full px-1' key={index}>{data.name}</span>)}
            </p>
            <p className='text-gray-200 text-lg max-w-sm w-full'>
              {pokemon.description.description}
            </p>
          </div>
        </div>
      </section>
      <div className='separator-container'>
        <div className='separator'></div>
      </div>
      {/* stats */}
      <section className='stats'>
        <h3 className='text-4xl text-center pt-8 text-white font-semibold'>Estadisticas</h3>
        <div className='py-10'>
          {pokemon.stats.map((data, index) => <div className='flex items-center max-w-lg mx-auto justify-end gap-3' key={index}>
            <span className='text-gray-300 text-2xl py-1'>{data.name}</span>
            <div className='bg-gray-600 w-[300px] h-[25px] rounded-full'>
              <div className={`bg-indigo-500 rounded-full text-center text-gray-800 font-semibold text-lg h-full`}
                style={{ width: Math.round((data.stat * 100) / maxValues[index]) * 7 }}>
                {data.stat}
              </div>
            </div>
          </div>)}
        </div>
      </section>
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