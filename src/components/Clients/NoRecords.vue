<template>
  <VLayout
    column
    justify-center
    align-center
    class="pa-4"
  >
    <span class="subheading">No se encontraron registros</span>
    <span v-if="selectedClient.name" class="subheading">Agrega una planta para continuar</span>
    <span v-else class="subheading mt-2 text-xs-center">Selecciona o agrega un cliente para continuar</span>
  </VLayout>

</template>

<script>
import { mapState } from 'vuex';

export default { computed: { ...mapState('clients', ['selectedClient']) } };
</script>
