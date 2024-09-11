<template>
  <div class="pokedex" v-if="pokedexStore.pokemons.length">
    <SearchIcon class="pokedex__search-icon" />
    <input class="pokedex__search-bar" type="search" placeholder="Search" v-model="searchQuery" />
    <div class="pokedex__list">
      <PokemonList
        :pokemons="!favorites ? pokedexStore.pokemons : pokedexStore.favorites"
        :searchQuery="searchQuery"
        @openModal="openModal"
      />
    </div>
    <PokemonDetailsModal
      :show="isOpen"
      :pokemon="selectedPokemon"
      @close="isOpen = false"
      v-if="selectedPokemon"
    ></PokemonDetailsModal>
    <footer class="footer">
      <ListBtn label="All" :isActive="!favorites" @click="favorites = false">
        <ListIcon />
      </ListBtn>
      <ListBtn label="Favorites" :isActive="favorites" @click="favorites = true">
        <StarIcon :color="'white'" />
      </ListBtn>
    </footer>
  </div>
  <div v-else>
    <div class="loading">
      <img src="../assets/Loader.png" alt="Pokeball" class="loading__img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePokedexStore } from '@/stores/pokedex'
import PokemonDetailsModal from '@/components/PokemonDetailsModal.vue'
import type { PokemonDetails } from '@/types/interfaces'
import ListBtn from '@/components/ListBtn.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import PokemonList from '@/components/PokemonList.vue'

const pokedexStore = usePokedexStore()

const loading = ref<boolean>(true)
const favorites = ref<boolean>(false)
const isOpen = ref<boolean>(false)
const selectedPokemon = ref<null | PokemonDetails>(null)
const searchQuery = ref<string>('')

onMounted(() => {
  pokedexStore.getPokemon()
  loading.value = false
})

const openModal = async (url: string) => {
  selectedPokemon.value = await pokedexStore.fetchPokemonDetails(url)
  if (selectedPokemon.value !== null) isOpen.value = true
}
</script>

<style scoped lang="scss">
.pokedex {
  width: 570px;
  max-width: 570px;
  margin: 35px 0;
  position: relative;

  &__search-bar {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    margin-bottom: 40px;
    padding-left: 40px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px #0000000a;
    border: none;
    outline: none;
  }

  &__search-icon {
    position: absolute;
    left: 8px;
    top: 13px;
  }

  &__list {
    padding-bottom: 70px;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0px -5px 4px 0px #0000000d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__img {
    width: 100px;
    height: 100px;
    animation: zoomInOut 1.5s ease-in-out infinite;
  }
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@media only screen and (max-width: 768px) {
  .pokedex {
    width: 100%;
    margin: 10px;

    &__search-bar {
      margin-bottom: 30px;
    }
    &__list {
      padding-bottom: 80px;
    }
  }
}
</style>
