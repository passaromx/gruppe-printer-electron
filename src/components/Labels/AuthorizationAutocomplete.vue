<template>
  <VAutocomplete
    v-on="$listeners"
    v-model="selectedAuth"
    label="Autorización"
    :loading="loading"
    :search-input.sync="search"
    clearable
    :readonly="selectedAuth != null"
    :items="authorizations"
    item-text="name"
    item-value="id"
    hide-selected
    return-object
    :error-messages="messages"
    placeholder="Escribe para buscar..."
    @input="handleInput"
    @change="handleChange"/>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */

import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['name', 'messages', 'selectedAuth'],
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
      loading: false
    };
  },
  computed: {
    ...mapGetters('labels', ['fromClient']),
    ...mapGetters('authorizations', ['authorizations'])
  },
  watch: {
    fromClient(val) {
      if (val) this.fetch(val);
    }
  },
  methods: {
    ...mapActions('authorizations', ['fetch']),
    handleInput(value) {
      this.$emit('input', value);
    },
    handleChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>
