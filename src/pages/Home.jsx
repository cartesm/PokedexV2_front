import React, { useState } from 'react'
import ListItem from '../components/ListItem'
import { usePoke } from '../context/poke.context'

function Home() {

  const { allPokemons } = usePoke()
  const [dataFiltered, setDataFiltered] = useState([])
  const [rendered, setRendered] = useState(50)


  const handleChange = (e) => {
    const data = allPokemons.filter(value =>
      value.name.toLowerCase().includes(e.target.value.toLowerCase()))
    if (data.length == allPokemons.length) return setDataFiltered([])
    setDataFiltered(data)
  }
  const handleSubmit = (e) => e.preventDefault()
  return (
    <main className='main-content h-screen bg-[#103a55] max-w-5xl mx-auto'>
      <section>
        <h2 className='text-white text-3xl font-bold my-3 text-center'>Busca un pokemon</h2>
        <div className=' bg-slate-200 flex items-center justify-evenly max-w-[300px] py-1 my-5 rounded-full mx-auto'>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} placeholder='Id o Nombre'
              className='outline-none rounded-md bg-transparent' />
            <input type="submit" value="Buscar"
              className='rounded-full bg-[#08acaa] text-white px-2 ' />
          </form>
        </div>
        <div className='p-3 grid grid-cols-3 md:grid-cols-5 max-w-3xl max-h-[600px]  mx-auto'>
          {dataFiltered.slice(0, 5).map((data, index) => <ListItem data={data} key={index} />)}
        </div>
      </section>
      <section>
        <div className=' p-3 grid grid-cols-3 md:grid-cols-5 max-w-3xl max-h-[500px] overflow-auto scrollbar-moves mx-auto'>
          {allPokemons.slice(0, rendered).map((data, index) => <ListItem data={data} key={index} />)}
        </div>
        <div className='text-lg text-white font-semibold text-center my-6 '>
          <span onClick={() => setRendered(rendered + 50)}
            className='bg-[#0c7888] rounded-sm px-3 py-1 mx-2 cursor-pointer'>añadir mas</span>
          <span onClick={() => rendered==50?undefined: setRendered(rendered - 50)}
            className={`${rendered>50?"bg-[#0c7888]":"bg-slate-600"} rounded-sm px-3 py-1 mx-2 cursor-pointer `}>menos</span>
        </div>
      </section>
    </main>
  )
}

export default Home