<template>
  <teleport to="body">
    <div v-if="show && pokemon" class="modal">
      <div class="modal__content">
        <div class="modal__background-img">
          <img :src="`${pokemon.image}`" class="modal__img" alt="pokemon" />
        </div>
        <div class="modal__pokemon-details">
          <div>
            <ul>
              <li><b>Name: </b>{{ pokemon.name }}</li>
              <li><b>Weight: </b>{{ pokemon.weight }}</li>
              <li><b>Height: </b>{{ pokemon.height }}</li>
              <li><b>Types: </b>{{ pokemon.type }}</li>
            </ul>
          </div>
          <div class="share-details">
            <button class="share-details__btn" @click="copyToClipboard()">
              Share to my friends
            </button>
            <FavoriteBtn
              v-if="currentPokemon"
              :favorite="currentPokemon.favorite"
              @changeFav="currentPokemon.favorite = !currentPokemon.favorite"
            ></FavoriteBtn>
          </div>
        </div>

        <button class="modal__close-btn" @click="closeModal"><CloseButton /></button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import type { PokemonDetails } from '@/types/interfaces'
import CloseButton from './icons/CloseButtonIcon.vue'
import FavoriteBtn from './FavoriteBtn.vue'
import { usePokedexStore } from '@/stores/pokedex'
import { computed } from 'vue'

const props = defineProps<{ show: Boolean; pokemon: PokemonDetails }>()

const pokedexStore = usePokedexStore()

const currentPokemon = computed(() =>
  pokedexStore.pokemons.find((p) => p.name === props.pokemon.name)
)

const copyToClipboard = () => {
  const textToCopy = `Name: ${props.pokemon.name}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${props.pokemon.type}`

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert('Pokemon data copied to clipboard')
    })
    .catch((err) => {
      console.error('Error: ', err)
    })
}

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    background: white;
    border-radius: 5px;
    width: 570px;
    gap: 0px;
    opacity: 0px;
    text-align: center;
    position: relative;
  }

  &__background-img {
    background-image: url('../assets/poke-background.png');
    background-color: none;
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__pokemon-details {
    padding: 20px 30px;
  }

  &__img {
    width: 180px;
    height: 180px;
  }
  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

li {
  list-style-type: none;
  font-family: Lato;
  font-size: 18px;
  line-height: 27px;
  text-align: left;
  color: #5e5e5e;
  padding: 10px 0px;
  border-bottom: 1px solid #e8e8e8;
}

.share-details {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  &__btn {
    width: 275px;
    height: 44px;
    top: 18px;
    left: 291px;
    padding: 11px 0px 11px 0px;
    gap: 10px;
    color: #ffffff;
    border-radius: 60px;
    opacity: 0px;
    background-color: red;
  }
}

@media only screen and (max-width: 768px) {
  .modal__content {
    width: 100%;
    margin: 10px;
  }
  .share-details__btn {
    width: fit-content;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
