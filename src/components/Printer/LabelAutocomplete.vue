<template>
  <VAutocomplete
    outline
    @input="handleInput"
    v-on="$listeners"
    v-model="selectedLabel"
    label="Producto"
    :loading="fetching"
    :search-input.sync="search"
    clearable
    :readonly="selectedLabel != null"
    :items="formattedLabels"
    item-text="description"
    item-value="_id"
    hide-selected
    return-object
    :error-messages="messages"
    placeholder="Escribe para buscar en lista"/>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('labels');

export default {
  props: ['name', 'messages'],
  $_veeValidate: {
    // value getter
    value() {
      return this.$el.value;
    },
    // name getter
    name() {
      return this.name;
    }
  },
  data() {
    return {
      descriptionLimit: 60,
      search: null,
      label: null,
      selectedLabel: null
    };
  },
  computed: {
    ...mapState(['fetching']),
    ...mapGetters(['formattedLabels']),
    client() {
      return this.$store.state.auth.user.client._id || null;
    }
  },
  watch: {
    search() {
      if (this.formattedLabels.length > 0 || this.fetching) return;
      if (this.client) this.fetch(this.client);
    }
  },
  methods: {
    ...mapActions(['fetch']),
    handleInput(value) {
      console.log(value);
      this.$emit('input', value);
    }
  }
};
</script>
