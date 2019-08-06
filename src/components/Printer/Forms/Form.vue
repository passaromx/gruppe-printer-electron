<template>
  <VLayout row wrap>
    <VFlex
      v-for="(field, index) in renderFields"
      :key="index"
      :class="field.class || fieldClass(field)"
    >
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
        v-if="field.type === 'text' || field.type === 'number' "
        :type="field.type"
        :disabled="!selectedLabel || (isMock && field.name != 'weight')"
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
  </VLayout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import moment from 'moment';

// const today = new Date();

// const addDays = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

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
      console.log('computing desc', formatted);
      return formatted;
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

    // this.$eventHub.$on('validate', () => {
    //   this.$validator.validate().then(res => {
    //     if (res) {
    //       console.log('valid');
    //     } else {
    //       console.log('invalid');
    //     }
    //   });
    // });
  },
  beforeDestroy() {
    this.$eventHub.$off('compute-desc');
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
      // console.log('setting desc', this.description);
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
