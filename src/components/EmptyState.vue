<template>
  <div class="empty-state">
    <h1 class="empty-state__title">Uh-oh!</h1>
    <p class="empty-state__text">You look lost on your journey!</p>
    <RouterLink to="/" class="primary-btn">Go back home</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  &__title {
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
  }

  &__text {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    color: #5e5e5e;
    margin: 10px 0 25px 0;
  }
}
</style>
