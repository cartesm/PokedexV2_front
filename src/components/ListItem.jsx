import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from './ImagePrecharge';
function ListItem({ data }) {

  const [id, setId] = useState(0)
  
  useEffect(() => {
    const match = data.url.match("/([^/]+)/?$")[1];
    setId(match)
  }, [data])



  return (
    <Link to={`/pokemon/${data.name}`} reloadDocument className='bg-[#103a55] text-center flex flex-col items-center  m-1 rounded-md'>
      <Image url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
      alt={data.name} />
      <span className='text-lg font-semibold text-[#04edc9]'>{data.name}</span>
    </Link>
  )
}

export default ListItem