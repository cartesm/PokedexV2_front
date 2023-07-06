import React, { useState } from 'react'
import ListItem from '../components/ListItem'
import { usePoke } from '../context/poke.context'

function Home() {

  const { allPokemons } = usePoke()
  const [dataFiltered, setDataFiltered] = useState([])

  const handleChange = (e) => {
    const data = allPokemons.filter(value =>
      value.name.toLowerCase().includes(e.target.value.toLowerCase())) 
    if(data.length==allPokemons.length) return setDataFiltered([])
    setDataFiltered(data)
  }
  const handleSubmit =(e)=> e.preventDefault()
  return (
    <main>
      <section>
        <h3>Busca un pokemon</h3>
        <div className=' bg-slate-200 flex items-center justify-around max-w-xs my-6 py-1 px-3 rounded-full mx-auto'>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} placeholder='Id o Nombre'
              className='outline-none rounded-md bg-transparent' />
            <input type="submit" value="Buscar"
              className='rounded-full bg-indigo-400 text-white px-2 ' />
          </form>
        </div>
        <div className='bg-slate-200 p-3 grid grid-cols-5 max-w-3xl max-h-[600px]  mx-auto'>
          {dataFiltered.slice(0,5).map((data,index)=><ListItem data={data} key={index}/>)}
        </div>
      </section>
      <section>
        <div className='bg-slate-200 p-3 grid grid-cols-5 max-w-3xl  mx-auto'>
          {allPokemons.slice(0, 50).map((data, index) => <ListItem data={data} key={index} />)}
        </div>

      </section>
    </main>
  )
}

export default Home