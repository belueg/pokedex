<template>
  <button :class="['list__btn', { 'list__btn--active': isActive }]" @click="handleClick">
    <slot></slot>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  isActive: boolean
}>()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
.list__btn {
  margin: 0px 10px;
  width: 275px;
  height: 44px;
  top: 18px;
  left: 291px;
  padding: 11px 0px 11px 0px;
  gap: 10px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
  opacity: 0px;
  background-color: #bfbfbf;
  &--active {
    background-color: red;
  }
}
</style>
