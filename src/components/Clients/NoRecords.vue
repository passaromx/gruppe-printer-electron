<template>
  <VLayout
    column
    justify-center
    align-center
    class="pa-4"
  >
    <span class="subheading">No se encontraron registros</span>
    <span class="subheading">Agrega una planta para continuar</span>
  </VLayout>
</template>

<script>
import { mapState } from 'vuex';

export default { computed: { ...mapState('clients', ['selectedClient']) } };
</script>
