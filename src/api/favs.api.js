import axios from './axios.js'

export const addFavRequest = (data) => axios.post("/add-favorite", data)

export const deleteFavRequest = (id) => axios.delete(`/delete-favorite/${id}`)

export const getFavsRequest = () => axios.get("/get-favorites")