<template>
  <VLayout row wrap>
    <VFlex
      v-for="(field, index) in renderFields"
      :key="index"
      :class="field.class || fieldClass(field)"
    >
      <DatePicker
        v-if="field.type === 'date'"
        :disabled="!selectedLabel"
        @change="handleDate(index, $event)"
        :name="index"
        :label="field.label"
        v-model="field.value"
        v-validate="'required'"
        :messages="errors.collect(index)"
      />
      <VTextField
        v-if="field.type != 'date' && field.type != 'title'"
        :number="field.type === 'number'"
        :disabled="!selectedLabel"
        @input="handleInput(index)"
        outline
        v-model="formData[index]"
        :label="field.label"
        v-validate="field.validation"
        :data-vv-name="index"
        :error-messages="errors.collect(index)"
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

// const today = new Date();

// const addDays = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

export default {
  // $_veeValidate: { validator: 'new' },
  inject: ['$validator'],
  components: { DatePicker: () => import('@/components/Printer/DatePicker') },
  data() {
    return {
      formData: {
        productionDate: new Date().toISOString().substr(0, 10),
        // expireDate: addDays(today, 90).toISOString().substr(0, 10),
        line: 1,
        turn: 1,
        batch: 'A',
        sequential: '001',
        copies: 1
      }
    };
  },
  computed: {
    ...mapState('printer', ['selectedLabel', 'variables', 'descriptionFormat']),
    description() {
      const formatted = this.descriptionFormat
        .split('-')
        .reduce((format, variable, i) => `${format}${i === 0 ? '' : '-'}${this.formData[variable]}`, '');
      return formatted;
    },
    renderFields() {
      const fields = { ...this.variables };
      delete fields.description;
      delete fields.sideDescription;
      return fields;
    }
  },
  mounted() {
    Object.keys(this.variables).forEach(key => {
      // console.log(key);
      this.setVariableValue({
        name: key,
        value: this.formData[key]
      });
    });
    this.setDescription();

    this.$eventHub.$on('validate', () => {
      this.$validator.validate().then(res => {
        if (res) {
          console.log('valid');
        } else {
          console.log('invalid');
        }
      });
    });
  },
  beforeDestroy() {
    this.$eventHub.$off('validate');
  },
  methods: {
    ...mapMutations('printer', ['setVariableValue', 'setCopies']),
    handleDate(picker, value) {
      this.setVariableValue({
        name: picker,
        value
      });
    },
    handleInput(field) {
      this.setVariableValue({
        name: field,
        value: this.formData[field]
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
