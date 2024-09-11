<template>
  <img
    src="../assets/Loader.png"
    alt="Pokeball"
    class="loading__img"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 100
  }
})
</script>

<style lang="scss">
.loading__img {
  animation: zoomInOut 1.5s ease-in-out infinite;
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
</style>
