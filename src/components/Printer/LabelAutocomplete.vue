<template>
  <VAutocomplete
    outline
    @input="handleInput"
    @change="handleChange"
    v-on="$listeners"
    v-model="selectedLabel"
    label="Producto"
    :loading="isSyncing"
    :search-input.sync="search"
    clearable
    :readonly="selectedLabel != null"
    :hide-details="!messages.length"
    :items="formattedLabels"
    item-text="description"
    item-value="_id"
    hide-selected
    return-object
    :error-messages="messages"
    placeholder="Escribe para buscar..."/>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */

import { createNamespacedHelpers } from 'vuex';
import { ipcRenderer } from 'electron';

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('printer');

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
    ...mapState(['isSyncing']),
    ...mapGetters(['formattedLabels']),
    client() {
      return this.$store.state.auth.user.client._id || null;
    }
  },
  methods: {
    ...mapMutations(['setSelectedLabel']),
    handleInput(value) {
      this.$emit('input', value);
    },
    handleChange(value) {
      this.setSelectedLabel(value);
      if (value) {
        this.$eventHub.$emit('compute-desc');
        ipcRenderer.send('selected-label', this.client, value.labelPng.url);
      }
    }
  }
};
</script>
