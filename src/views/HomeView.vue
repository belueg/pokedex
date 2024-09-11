<template>
  <div class="pokedex">
    <img
      src="../assets/pikachu.png"
      width="325px"
      height="288px"
      alt="Pikachu"
      class="pokedex__image"
    />
    <h1 class="pokedex__title">Welcome to Pokédex</h1>
    <p class="pokedex__description">
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>
    <RouterLink to="/pokedex" class="primary-btn">Get started</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.pokedex {
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__image {
    width: 325px;
    height: 288px;
  }

  &__title {
    font-weight: bold;
    margin: 40px 0 30px 0;
    font-size: 26px;
    font-weight: 700;
    line-height: 31.2px;
  }

  &__description {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    width: auto;
    font-family: Lato;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    text-align: center;
  }
}

@media only screen and (max-width: 768px) {
  .pokedex__image {
    width: 100%;
    height: auto;
  }
}
</style>
