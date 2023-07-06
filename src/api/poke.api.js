import Axios from 'axios'

const axios = Axios.create()

export const getAllpokemonsRequest = () => axios.get("https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0")

export const getPokemonRequest = (id)=> axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) 

export const getDataPokemonRequest =(url)=>axios.get(url)