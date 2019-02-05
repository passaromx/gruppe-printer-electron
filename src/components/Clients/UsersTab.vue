<template>
  <FilterableList :items="users" :settings="settings" :lines="2">
    <VListTileContent slot-scope="props">
      <VListTileTitle>{{ props.item.email }}</VListTileTitle>
      <VListTileSubTitle>Inicio de sesión: {{ props.item.lastLogin|dateAndTime }}</VListTileSubTitle>
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
