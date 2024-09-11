<template>
  <div class="pokemon-list" v-if="filteredPokemons.length > 0">
    <div class="pokemon-list__item" v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <span class="pokemon-list__name" @click="handleOpenModal(pokemon.url)">{{
        pokemon.name
      }}</span>
      <FavoriteBtn
        :favorite="pokemon.favorite"
        @changeFav="pokemon.favorite = !pokemon.favorite"
      ></FavoriteBtn>
    </div>
  </div>
  <EmptyState v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FavoriteBtn from '@/components/FavoriteBtn.vue'
import EmptyState from '@/components/EmptyState.vue'
import type { Pokemon } from '@/types/interfaces'

const emit = defineEmits(['openModal'])

const props = defineProps({
  pokemons: Array as () => Pokemon[],
  searchQuery: String
})

const handleOpenModal = (url: string) => {
  emit('openModal', url)
}

const filteredPokemons = computed(() => {
  return props.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(props.searchQuery.toLowerCase())
  )
})
</script>

<style scoped lang="scss">
.pokemon-list {
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
}
</style>
