<template>
  <FilterableList
    :items="printers"
    :settings="settings"
    :actions="false"
    :lines="3"
  >
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.printerName || 'Sin impresora registrada' }}</VListTileTitle>
      <VListTileSubTitle>{{ props.item.hostname }}: {{ props.item.updatedAt|prettyDate }}</VListTileSubTitle>
      <VListTileSubTitle>Última impresión: {{ props.item.print.updatedAt|prettyDate }}</VListTileSubTitle>
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
