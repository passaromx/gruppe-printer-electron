<template>
  <BaseCard flat :isFullHeight="true" color="grey lighten-2">
    <VLayout fill-height align-center>
      <VImg
        v-if="selectedLabel && label"
        alt="label"
        :src="label"
        contain
        class="preview-img"/>
      <VLayout
        v-if="selectedLabel && previewLoader"
        class="loader-bg"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <VProgressCircular indeterminate color="teal"></VProgressCircular>
      </VLayout>
    </VLayout>
  </BaseCard>
</template>

<style scoped>
.preview-img {
  height: 87vh;
}

.loader-bg {
  position: absolute;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
}
</style>
<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return { label: null };
  },
  computed: { ...mapState('printer', ['selectedLabel', 'previewLoader']) },
  mounted() {
    ipcRenderer.on('label', (e, label) => {
      this.label = label;
      this.setPreviewLoader(false);
    });
  },
  methods: { ...mapMutations('printer', ['setPreviewLoader']) }
};

</script>
