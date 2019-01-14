<template>
  <VSelect
    :loading="fetching"
    :items="clients"
    :value="fromClient"
    item-text="name"
    item-value="_id"
    label="Cliente"
    hide-details
    @change="onClientChanged"/>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  mounted() {
    if (this.clients.length === 0) this.fetch();
  },
  computed: {
    ...mapState('clients', ['clients', 'fetching']),
    ...mapState('labels', ['fromClient'])
  },
  methods: {
    ...mapActions('clients', ['fetch']),
    ...mapMutations('labels', ['setClient', 'setLabels']),
    onClientChanged(val) {
      this.setLabels([]);
      this.setClient(val);
    }
  }
};
</script>
