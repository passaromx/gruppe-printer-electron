<template>
  <VContainer>
    <span>Descargando, esto puede tardar varios minutos</span>
    <VProgressLinear :value="progress" indeterminate/>
  </VContainer>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';

export default {
  data() {
    return { progress: 0 };
  },
  mounted() {
    setInterval(() => {
      // Request a sync response via IPC
      this.progress = ipcRenderer.sendSync('download-progress-request');
    }, 1000);
  }
};
</script>
