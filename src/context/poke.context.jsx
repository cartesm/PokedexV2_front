import { createContext, useContext, useState } from 'react'
import { getDataPokemonRequest, getPokemonRequest } from '../api/poke.api'

const pokeContext = createContext()
export const usePoke = () => {
    const context = useContext(pokeContext)
    if (!pokeContext) throw new Error("context is empty")
    return context
}

const pokeContextProvider = ({ children }) => {

    const [pokemon, setPokemon] = useState({})
    const [charge, setCharge] = useState(true)

    const getPokemon = async (id) => {
        try {
            const resp = await getPokemonRequest(id)
            /* 
            -tipos--
            -stats--
            -descripcion--
            -linea evolutiva
            -habilidades--
            -mobimientos--
            -apariciones // game_indices

            */
            const urlDescription = async () => {
                const response = await getDataPokemonRequest(resp.data.species.url)
                const text = await response.data.flavor_text_entries.filter(data => data.language.name === "es")
                const subName = await response.data.genera.filter(data => data.language.name == "es")
                return {
                    nick: subName[0].genus,
                    description: text[0].flavor_text
                }
            };
            const urlStats = resp.data.stats.map(async (data, index) => {
                const response = await getDataPokemonRequest(data.stat.url)
                const trueData = response.data.names.filter(dt => dt.language.name == "es")[0].name
                return {
                    name: trueData,
                    stat: resp.data.stats[index].base_stat
                }
            });
            const urlTypes = resp.data.types.map(async (data) => {
                const response = await getDataPokemonRequest(data.type.url)
                const dataTypes = await response.data.names.filter(ty => ty.language.name == "es")
                return { name: dataTypes[0].name }
            })
            const urlAbilities = resp.data.abilities.map(async data => {
                const response = await getDataPokemonRequest(data.ability.url)
                const name = response.data.names.filter(dt => dt.language.name == "es")[0].name
                const description = response.data.flavor_text_entries.filter(dt => dt.language.name == "es")[0].flavor_text
                return {
                    name,
                    description
                }
            })
            const urlMobments = resp.data.moves.map(async data => {

                const response = await getDataPokemonRequest(data.move.url)

                const name = response.data.names.filter(dt => dt.language.name == "es")[0]?.name
                const description = response.data.flavor_text_entries.filter(txt => txt.language.name == "es")[0]?.flavor_text

                const typeResp = await getDataPokemonRequest(response.data.damage_class.url)
                const type = typeResp.data.names.filter(dt => dt.language.name == "es")[0].name

                return {
                    name,
                    pp: response.data.pp,
                    type,
                    accuracy: response.data.accuracy,
                    power: response.data.power,
                    description


                }
            })
            const urlAparitions = resp.data.game_indices.map(async data => {
                const response = await getDataPokemonRequest(data.version.url)
                const name = response.data.names.filter(dt => dt.language.name == "es")[0].name
                return { game: name }
            })
            const urlEvolutionLine = async () => {
                const firstResponse = await getDataPokemonRequest(resp.data.species.url)
                const secondResponse = await getDataPokemonRequest(firstResponse.data.evolution_chain.url)
                const intermediare = secondResponse.data.chain.evolves_to.map((data) => data.species?.name)

                return {
                    first: secondResponse.data.chain.species.name,
                    intermediare,
                    finally: secondResponse.data.chain.evolves_to[0] ? secondResponse.data.chain.evolves_to[0].species.name : undefined
                }
            }
            console.log(resp.data)
            const dataEvolutionLine = await urlEvolutionLine()
            const dataDescription = await urlDescription()
            const dataStats = await Promise.all(urlStats)//los datos numericos estan es la repuesta general
            const dataTypes = await Promise.all(urlTypes)
            const dataAbilities = await Promise.all(urlAbilities)
            const dataMoves = await Promise.all(urlMobments)
            const dataAparitions = await Promise.all(urlAparitions)

            const all = {
                evolutions: dataEvolutionLine,
                abilities: dataAbilities,
                description: dataDescription,
                types: dataTypes,
                stats: dataStats,
                moves: dataMoves,
                aparitions: dataAparitions
            }
            console.log(all)

            setPokemon(resp.data)
            setCharge(false)
        } catch (err) {
            console.log(err)
            setCharge(false)
        }
    }

    return <pokeContext.Provider value={{
        getPokemon,
        pokemon,
        charge
    }}>
        {children}
    </pokeContext.Provider>
}
export default pokeContextProvider