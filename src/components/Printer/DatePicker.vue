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
      :disabled="disabled"
      slot="activator"
      :label="label"
      outline
      :value="formattedDate"
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
      @input="handleInput">
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
  props: ['name', 'value', 'label', 'messages', 'disabled'],
  data() {
    return {
      dateMenu: false,
      date: this.value
    };
  },
  mounted() {
    console.log(this.value);
    this.handleInput(this.date);
  },
  computed: {
    formattedDate() {
      if (this.value) {
        return moment(this.value).utc().format('L');
      }
      return null;
    }
  },
  methods: {
    handleInput(value) {
      this.$refs.dateMenu.save(value);
      this.$emit('input', this.date);
    },
    handleChange() {
      this.$emit('change', this.date);
    }
  }
};
</script>
