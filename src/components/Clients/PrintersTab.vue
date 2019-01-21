<template>
  <FilterableList
    :items="printers"
    :settings="settings"
    :actions="false"
    :lines="3"
  >
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.printerName || 'Sin impresora registrada' }}</VListTileTitle>
      <VListTileSubTitle>{{ props.item.hostname }}</VListTileSubTitle>
      <VListTileSubTitle>Última impresión: 01/01/2019</VListTileSubTitle>
    </VListTileContent>
  </FilterableList>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: { FilterableList: () => import('@/components/Clients/FilterableList') },
  data() {
    return {
      settings: {
        form: 'printer',
        module: 'clients/printers',
        deleteMethod: 'deletePrinter',
        filter: 'hostname'
      }
    };
  },
  computed: { ...mapGetters('clients', ['printers']) },
};
</script>
