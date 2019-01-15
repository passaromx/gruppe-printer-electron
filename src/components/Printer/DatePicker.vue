<template>
  <VMenu
    :disabled="disabled"
    ref="dateMenu"
    lazy
    :close-on-content-click="false"
    v-model="dateMenu"
    transition="scale-transition"
    offset-y
    full-width
    :nudge-right="40"
    min-width="290px"
    :return-value.sync="date"
  >
    <VTextField
      v-on="$listeners"
      :disabled="disabled"
      slot="activator"
      :label="label"
      outline
      @input="handleInput"
      v-model="formattedDate"
      append-icon="event"
      :error-messages="messages"
      required
      readonly
    ></VTextField>
    <VDatePicker
      @change="handleChange"
      v-model="date"
      no-title
      scrollable
      @input="$refs.dateMenu.save(date)">
      <!-- <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="expiresMenu = false">Cancelar</v-btn>
      <v-btn flat color="primary" @click="$refs.expiresMenu.save(editedItem.expiresAt)">OK</v-btn> -->
    </VDatePicker>
  </VMenu>
</template>

<script>
import moment from 'moment';

export default {
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
  props: ['name', 'label', 'messages', 'disabled'],
  data() {
    return {
      dateMenu: false,
      date: null
    };
  },
  computed: {
    formattedDate() {
      if (this.date) {
        return moment(this.date).utc().format('L');
      }
      return moment().format('L');
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },
    handleChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>
