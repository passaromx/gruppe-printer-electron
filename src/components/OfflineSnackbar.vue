<template>
  <VSnackbar
    :value="!isOnline"
    color="red"
    top
    :timeout="0"
  >
    <VIcon dark class="mr-2">wifi_off</VIcon>
    <span class="white--text">
      Sin internet, puedes seguir trabajando. Última actualización: {{ config.lastSync|dateAndTime }}
    </span>
  </VSnackbar>
</template>

<script>
// Utilities
import { mapState, mapGetters } from 'vuex';

export default {
  data: () => ({ model: false }),
  computed: {
    ...mapState(['isOnline']),
    ...mapState('printer', ['config']),
    ...mapGetters('auth', ['isAdmin'])
  }
};
</script>
