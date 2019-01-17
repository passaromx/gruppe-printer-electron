<template>
  <FilterableList :items="factories" :settings="settings">
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.name }}</VListTileTitle>
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
        form: 'factory',
        module: 'clients/factories',
        deleteMethod: 'deleteFactory',
        filter: 'name'
      }
    };
  },
  computed: { ...mapGetters('clients', ['factories']) },
};
</script>
