<template>
  <VCard
    class="elevation-2"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </VCard>
</template>

<style scoped>
  .v-card {
    border-radius: 4px;
  }
</style>
