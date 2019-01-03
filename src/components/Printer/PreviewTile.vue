<template>
  <BaseCard flat :isFullHeight="true" color="grey lighten-2">
    <VLayout fill-height align-center>
      <VImg
        alt="label"
        :src="require('../../assets/label.png')"
        contain
        class="preview-img"/>
    </VLayout>
  </BaseCard>
</template>

<style scoped>
.preview-img {
  height: 87vh;
}
</style>
