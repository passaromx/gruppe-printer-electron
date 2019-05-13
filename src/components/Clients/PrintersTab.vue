<template>
  <FilterableList
    :items="printers"
    :settings="settings"
    :actions="false"
    :lines="3"
  >
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.printerName || 'Sin impresora registrada' }}</VListTileTitle>
      <VListTileSubTitle>{{ props.item.hostname }}: {{ props.item.updatedAt|dateAndTime }}</VListTileSubTitle>
      <VListTileSubTitle>
        Última impresión:
        <span v-if="props.item.print">{{ props.item.print.updatedAt|dateAndTime }}</span>
        <span v-else>Sin información</span>
      </VListTileSubTitle>
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
