<template>
  <VCard
    v-bind:class="{ 'full-height': isFullHeight }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </VCard>
</template>

<script>
export default { props: ['isFullHeight'] };
</script>


<style scoped>
  .full-height {
    height: 100vh;
    border-radius: 0;
  }
</style>
