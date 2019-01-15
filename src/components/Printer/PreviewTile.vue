<template>
  <BaseCard flat :isFullHeight="true" color="grey lighten-2">
    <VLayout fill-height align-center>
      <VImg
        v-if="label"
        alt="label"
        :src="label"
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
<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';

export default {
  data() {
    return { label: null };
  },
  mounted() {
    ipcRenderer.on('label', (e, label) => {
      this.label = label;
    });
  }
};

</script>
