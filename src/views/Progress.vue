<template>
  <VProgressLinear
    :value="progress"
  ></VProgressLinear>
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
    }, 500);
  }
};
</script>
