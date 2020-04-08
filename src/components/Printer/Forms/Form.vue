<template>
  <VLayout row wrap>
    <template v-for="(field, index) in renderFields">
      <VFlex v-if="!field.fromSettings" :class="field.class || fieldClass(field)" :key="index">
        <VSelect
          v-if="field.type === 'select'"
          :items="field.items"
          v-model="formData[index]"
          :disabled="!selectedLabel || isMock"
          :label="field.label"
          outline
          :hide-details="!errors.collect(index).length"
          @change="handleSelect(index, $event)"
        />
        <DatePicker
          v-if="field.type === 'date'"
          :disabled="!selectedLabel || isMock"
          @change="handleDate(index, $event)"
          :name="index"
          :label="field.label"
          v-model="field.value"
          v-validate="'required'"
          :messages="errors.collect(index)"
        />
        <VTextField
          :maxlength="field.maxlength || 20"
          v-if="field.type === 'text' || field.type === 'number'"
          :type="field.type"
          :disabled="!selectedLabel || (isMock && (field.name != 'weight' && field.label != 'Lote'))"
          outline
          :hide-details="!errors.collect(index).length"
          v-model="formData[index]"
          :label="field.label"
          v-validate="field.validation"
          :data-vv-name="index"
          :error-messages="errors.collect(index)"
          @input="handleInput(index)"
        />
        <span
          v-if="field.type == 'title'"
          class="subheading"
        >{{field.label}}</span>
      </VFlex>
    </template>

  </VLayout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  // $_veeValidate: { validator: 'new' },
  props: {
    isMock: {
      type: Boolean,
      default: false
    }
  },
  inject: ['$validator'],
  components: { DatePicker: () => import('@/components/Printer/DatePicker') },
  computed: {
    ...mapState('printer', ['selectedLabel', 'variables', 'descriptionFormat']),
    description() {
      if (this.variables.descriptionFormat) {
        const formatted = this.variables.descriptionFormat
          .split('-')
          .reduce((format, variable, i) => {
            let value = this.formData[variable];
            if (this.variables.fields[variable].type === 'date') {
              const { dateFormat } = this.variables.fields.description;
              value = moment(this.formData[variable]).format(dateFormat);
            }
            return `${format}${i === 0 ? '' : '-'}${value || ''}`;
          }, '');
        return formatted;
      }
      return '';
    },
    formData() {
      const fields = { ...this.variables.fields };
      const data = {};
      Object.keys(fields).forEach(key => {
        data[key] = fields[key].value;
      });
      return data;
    },
    renderFields() {
      const fields = { ...this.variables.fields };
      delete fields.description;
      delete fields.sideDescription;
      return fields;
    }
  },
  mounted() {
    this.setDescription();
    this.$eventHub.$on('compute-desc', () => {
      this.setDescription();
    });
    this.$eventHub.$on('clear-inputs', () => {
      Object.keys(this.renderFields).forEach(key => {
        this.renderFields[key].value = null;
        this.formData[key] = null;
        this.setVariableValue({
          name: key,
          value: null
        });
      });
      this.setDescription();
      console.log(this.formData);
      // this.$validator.reset();
    });
  },
  beforeDestroy() {
    this.$eventHub.$off('compute-desc');
    this.$eventHub.$off('clear-inputs');
  },
  methods: {
    ...mapMutations('printer', ['setVariableValue', 'setCopies']),
    handleDate(picker, value) {
      this.setVariableValue({
        name: picker,
        value
      });
      this.setDescription();
    },
    handleInput(field) {
      this.setVariableValue({
        name: field,
        value: this.formData[field]
      });
      this.setDescription();
    },
    handleSelect(name, value) {
      this.setVariableValue({
        name,
        value
      });
      this.setDescription();
    },
    setDescription() {
      this.formData.description = this.description;
      this.setVariableValue({
        name: 'description',
        value: this.description
      });
    },
    fieldClass(field) {
      return field.type === 'date' ? 'xs12' : 'xs6';
    }
  }
};
</script>
