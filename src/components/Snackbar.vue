<template>
  <VSnackbar
    v-model="model"
    :color="snackbar.type"
    :timeout="snackbar.timeout"
    right
  >
    <VIcon
      :dark="snackbar.type !== 'warning'"
      class="mr-2"
      v-text="icon"
    />
    <span
      :class="snackbar.type === 'warning' ? 'black--text' : 'white--text'"
      v-text="snackbar.msg"
    />
  </VSnackbar>
</template>

<script>
// Utilities
import { mapState } from 'vuex';

const ICON_MAP = {
  error: 'report',
  info: 'info',
  success: 'check_circle',
  warning: 'warning'
};

export default {
  data: () => ({ model: false }),

  computed: {
    ...mapState(['snackbar']),
    icon() {
      return ICON_MAP[this.snackbar.type] || 'mdi-playlist-check';
    }
  },

  watch: {
    snackbar() {
      this.model = true;
    }
  }
};
</script>
