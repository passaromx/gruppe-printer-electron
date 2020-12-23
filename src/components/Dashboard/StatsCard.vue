<template>
  <VCard>
    <VCardTitle class="headline">
      {{ title }}
    </VCardTitle>
    <VCardText>
      <h1 class="display-3">{{ data }}</h1>
    </VCardText>
  </VCard>
</template>

<script>
export default { props: ['title', 'data'] };
</script>
