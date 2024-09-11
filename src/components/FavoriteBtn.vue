<template>
  <button class="favorite-btn" @click="emit('changeFav')">
    <StarIcon :color="starColor(favorite)"></StarIcon>
  </button>
</template>

<script setup lang="ts">
import StarIcon from '@/components/icons/StarIcon.vue'
const emit = defineEmits(['changeFav'])

 defineProps({
  favorite: Boolean
})

const starColor = (favorite: boolean) => (favorite ? '#ECA539' : '#BFBFBF')
</script>

<style scoped>
.favorite-btn {
  background: #f5f5f5;
  width: 44px;
  height: 44px;
  top: 8px;
  left: 516px;
  gap: 0px;
  opacity: 0px;
  border-radius: 100%;
}
</style>
