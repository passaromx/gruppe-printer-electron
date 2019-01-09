<template>
  <VDialog v-model="dialog" max-width="400px">
    <ClientForm :editedItem="editedItem" v-if="showing === 'client'"/>
    <FactoryForm :editedItem="editedItem" v-else-if="showing === 'factory'"/>
    <UserForm :editedItem="editedItem" v-else-if="showing === 'user'"/>
  </VDialog>
</template>

<script>
export default {
  components: {
    ClientForm: () => import('@/components/Clients/ClientForm'),
    FactoryForm: () => import('@/components/Clients/FactoryForm'),
    UserForm: () => import('@/components/Clients/UserForm')
  },
  data() {
    return {
      dialog: false,
      showing: null,
      editedItem: null,
    };
  },
  mounted() {
    this.$eventHub.$on('openFormDialog', ({ editedItem, form }) => {
      this.editedItem = editedItem;
      this.showing = form;
      this.dialog = true;
    });
    this.$eventHub.$on('closeFormDialog', () => {
      this.showing = null;
      this.dialog = false;
    });
  },
  onDestroy() {
    this.$eventHub.$off('openFormDialog');
    this.$eventHub.$off('closeFormDialog');
  }
};
</script>
