import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon, PokemonDetails } from '@/types/interfaces'

export const usePokedexStore = defineStore('pokedex', () => {
  const pokemons = ref<Pokemon[]>([])
  const pokemonDetails = ref<{ [key: string]: PokemonDetails }>({})

  const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
    if (!pokemonDetails.value[url]) {
      const response = await fetch(url)
      const { name, weight, height, sprites, types } = await response.json()

      pokemonDetails.value[url] = {
        name: name,
        weight: weight,
        height: height,
        image: sprites.other.dream_world.front_default,
        type: types.map((obj) => obj.type.name).join(', ')
      }
    }

    return pokemonDetails.value[url]
  }

  const getPokemon = async (): Promise<void> => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await response.json()

      setTimeout(() => {
        pokemons.value = data.results.map((result: Pokemon) => {
          return {
            ...result,
            favorite: false
          }
        })
      }, 1500)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const favorites = computed(() => {
    return pokemons.value.filter((pokemon) => pokemon.favorite)
  })

  return { getPokemon, pokemons, favorites, pokemonDetails, fetchPokemonDetails }
})
