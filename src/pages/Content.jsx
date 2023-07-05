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

        <div className='flex  items-center justify-center bg-slate-300 rounded-full'>
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
        <h3 className='text-4xl text-center pt-8 text-white font-bold'>Estadisticas</h3>
        <div className='py-10'>
          {pokemon.stats.map((data, index) => <div className=' flex items-center max-w-lg mx-auto justify-end gap-3' key={index}>
            <span className='text-gray-200 text-start block max-w-[250px] w-full text-2xl py-1'>{data.name}</span>
            <div className='w-[300px] flex justify-start h-[25px] bg-slate-400 rounded-full'>
              <div className={`bg-indigo-500 rounded-full text-center text-gray-800 font-semibold text-lg h-full`}
                style={{ width: Math.round((data.stat * 100) / maxValues[index]) * 6 }}>
                {data.stat}
              </div>
            </div>
          </div>)}
        </div>
        <div className='separator-2'></div>
      </section>
      <section>
        <h3 className='text-3xl font-bold text-white text-center my-7 '>Habilidades</h3>
        <div className='max-w-2xl w-full mx-auto text-lg'>
          {pokemon.abilities.map((data, index) => <div className='my-3 border-x-[20px] border-indigo-600 bg-slate-200 w-full rounded-full px-3 flex py-2 ' key={index}>
            <span className='bg-slate-100 rounded-full font-semibold text-indigo-500 px-2 mx-2'>
              {data.name}
            </span>
            <p>
              {data.description}
            </p>
          </div>)}
        </div>
      </section>
      <section>
        <h3 className='text-center text-3xl pt-10 pb-6 font-bold text-white'>
          Mobimientos que
          {firtLetterUP(pokemon.name)}
          <span className='underline'>
          </span>
          puede aprender.
        </h3>
        <div className='bg-slate-200 max-h-[400px] overflow-auto max-w-xl rounded-md mx-auto px-3 py-2'>
          <div className='grid grid-cols-4 bg-slate-100 rounded-full px-3 text-center my-2 gap-5 '>
            <span></span>
            <span>Nombre</span>
            <span>Tipo</span>
            <span>Potencia</span>
          </div>
          {pokemon.moves.map((data, index) => <div className='grid text-center grid-cols-4 my-2 gap-5 ' key={index}>
            <span>{index+1}</span>
            <span className={`bg-slate-100 w-[150px] text-indigo-500 font-semibold grid-1 inline-block px-2 rounded-full`}>{data.name ? data.name : "???"}</span>
            <span>{data.type}</span>
            <span>{!data.power ? "---" : data.power}</span>

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