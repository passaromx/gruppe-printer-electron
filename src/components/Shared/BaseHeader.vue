<template>
  <VLayout row justify-space-between>
    <h4 class="display-1 mb-4">{{ label }}</h4>
    <VBtn
      flat
      icon
      color="grey darken-2"
      @click="$emit('refresh')"
    >
      <VIcon>refresh</VIcon>
    </VBtn>
  </VLayout>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'PageHeader',
  props: ['label']
};
</script>
