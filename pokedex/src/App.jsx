// PARA CORRER EL PRO
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pokemones, setPokemones]= useState([]) //estado donde se guardan los pokemones

  useEffect(()=>{

    const getPokemones = async () =>{

      // recuperamos el estado de los pokemones

      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=700&offset=0') //trae los pokemones que necesitamos en este caso son 700 pokemones  //como es una pormesa se necesita la palabra reservada await

      const ListaPokemones = await response.json()
      const { results } = ListaPokemones   //en result se encuentr atodos los datos que necesitamos de los pokemones

      const newPokemones =results.map(async(pokemon) =>{
        const response = await fetch(pokemon.url)
        const poke = await response.json()

        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default,  //imagen 2d
          img1:poke.sprites.other.home.front_default,         //imagen 3d #1
          img2:poke.sprites.other.home.front_shiny            ////imagen 3d #2
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
              {/* <img src={pokemon.img1} alt={pokemon.name}></img>             las imagenes 3d comentadas por ser demaciadas pesadas
              <img src={pokemon.img2} alt={pokemon.name}></img> */}
              <p>{pokemon.name}</p>
              <span>#{pokemon.id}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
