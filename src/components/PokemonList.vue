<template>
  <div class="pokemon-list" v-if="filteredPokemons.length > 0" @scroll="onScroll">
    <div class="pokemon-list__item" v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <span class="pokemon-list__name" @click="handleOpenModal(pokemon.url)">{{
        pokemon.name
      }}</span>
      <FavoriteBtn
        :favorite="pokemon.favorite"
        @changeFav="pokemon.favorite = !pokemon.favorite"
      ></FavoriteBtn>
    </div>
    <div class="pokemon-list__loader" v-if="loading">
      <PokeballLoader :size="30" />
    </div>
  </div>
  <EmptyState v-else />
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount, watch } from 'vue'
import FavoriteBtn from '@/components/FavoriteBtn.vue'
import EmptyState from '@/components/EmptyState.vue'
import type { Pokemon } from '@/types/interfaces'
import PokeballLoader from './PokeballLoader.vue'

const visiblePokemons = ref<Pokemon[]>([])
const loading = ref(false)
const pokemonsToLoad = 4
let offset = 0
const emit = defineEmits(['openModal'])

const props = defineProps({
  pokemons: Array as () => Pokemon[],
  searchQuery: String
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const handleOpenModal = (url: string) => {
  emit('openModal', url)
}

const loadMoreItems = () => {
  if (props.pokemons) {
    const newPokemons = props.pokemons.slice(offset, offset + pokemonsToLoad)
    visiblePokemons.value.push(...newPokemons)
    offset += pokemonsToLoad
    loading.value = false
  }
}

const onScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = window.innerHeight

  if (scrollTop + clientHeight >= scrollHeight && !loading.value) {
    if (filteredPokemons.value.length !== props.pokemons?.length) {
      loading.value = true
      setTimeout(loadMoreItems, 2000)
    }
  }
}

window.addEventListener('scroll', onScroll)

loadMoreItems()

watch(
  () => props.pokemons,
  () => {
    offset = 0
    visiblePokemons.value = []
    loadMoreItems()
  }
)
const filteredPokemons = computed<Pokemon[]>(() => {
  const search = props.searchQuery || ''
  return visiblePokemons.value.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )
})
</script>

<style scoped lang="scss">
.pokemon-list::-webkit-scrollbar {
  display: none;
}

.pokemon-list {
  height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &__item {
    width: 100%;
    font-size: 26px;
    height: 130px;
    background: #ffffff;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  &__name {
    cursor: pointer;
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
