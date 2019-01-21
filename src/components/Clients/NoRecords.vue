<template>
  <VLayout
    column
    justify-center
    align-center
    class="pa-4"
  >
    <span class="subheading">No se encontraron registros</span>
    <span v-if="selectedClient.name" class="subheading">{{ legend }}</span>
    <span v-else class="subheading mt-2 text-xs-center">Selecciona o agrega un cliente para continuar</span>
  </VLayout>

</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['from'],
  computed: {
    ...mapState('clients', ['selectedClient']),
    legend() {
      switch (this.from) {
        case 'printer':
          return 'Aún no hay instalaciones para este cliente';
        case 'user':
          return 'Agrega un usuario para continuar';
        default:
          return 'Agrega una planta para continuar';
      }
    }
  }
};
</script>
