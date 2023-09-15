
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pokemones, setPokemones]= useState([]) //estado donde se guardan los pokemones

  useEffect(()=>{

    const getPokemones = async () =>{
      // recuperamos el estado de los pokemones
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      const ListaPokemones = await response.json()
      const { results } = ListaPokemones

      const newPokemones =results.map(async(pokemon) =>{
        const response = await fetch(pokemon.url)
        const poke = await response.json()

        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default
        }
      })

      setPokemones(await Promise.all(newPokemones))
    }
    getPokemones()
  }, [])

  return (
    <div className='App'>
      <h1>Pokedex</h1>

      {
        pokemones.map(pokemon => {
          return(
            <div>
              <img src={pokemon.img} alt={pokemon.name}></img>
              <p>{pokemon.name}</p>
              <span>{pokemon.id}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
