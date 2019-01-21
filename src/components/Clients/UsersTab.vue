<template>
  <FilterableList :items="users" :settings="settings">
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.email }}</VListTileTitle>
      <!-- <VListTileSubTitle>Some Other info</VListTileSubTitle> -->
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
        deleteMethod: 'deleteUser',
        filter: 'email'
      }
    };
  },
  computed: { ...mapGetters('clients', ['users']) },
};
</script>
