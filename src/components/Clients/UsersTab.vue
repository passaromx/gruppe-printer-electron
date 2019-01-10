<template>
  <FilterableList :items="users" :settings="settings">
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.email }}</VListTileTitle>
      <VListTileSubtitle>Some other info</VListTileSubtitle>
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
        form: 'user',
        module: 'clients/users',
        deleteMethod: 'deleteUser'
      }
    };
  },
  computed: { ...mapGetters('clients', ['users']) },
};
</script>
