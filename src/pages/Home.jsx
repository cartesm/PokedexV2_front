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
    <main className='main-content max-w-5xl mx-auto'>
      <section>
        <h2 className='text-white text-3xl font-bold text-center'>Busca un pokemon</h2>
        <div className=' bg-slate-200 flex items-center justify-evenly max-w-[300px] py-1 my-5 rounded-full mx-auto'>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} placeholder='Id o Nombre'
              className='outline-none rounded-md bg-transparent' />
            <input type="submit" value="Buscar"
              className='rounded-full bg-[#08acaa] text-white px-2 ' />
          </form>
        </div>
        <div className='p-3 grid grid-cols-3 md:grid-cols-5 max-w-3xl max-h-[600px]  mx-auto'>
          {dataFiltered.slice(0,4).map((data,index)=><ListItem data={data} key={index}/>)}
        </div>
      </section>
      <section>
        <div className=' p-3 grid grid-cols-3 md:grid-cols-5 max-w-3xl max-h-[500px] overflow-auto scrollbar-moves mx-auto'>
          {allPokemons.slice(0, 50).map((data, index) => <ListItem data={data} key={index} />)}
        </div>

      </section>
    </main>
  )
}

export default Home