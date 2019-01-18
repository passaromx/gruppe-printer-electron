<template>
  <VLayout row wrap>
    <VFlex xs6>
      <DatePicker
        :disabled="!selectedLabel"
        @change="handleDate('production', $event)"
        name="productionDate"
        label="Fecha de producción"
        v-model="productionDate"
        v-validate="'required'"
        :messages="errors.collect('productionDate')"/>
    </VFlex>
    <VFlex xs6>
      <DatePicker
        :disabled="!selectedLabel"
        @change="handleDate('expire', $event)"
        name="expireDate"
        label="Fecha de caducidad"
        v-model="expireDate"
        v-validate="'required'"
        :messages="errors.collect('expireDate')"/>
    </VFlex>
    <!-- + 90 días -->
    <VFlex xs4>
      <VTextField
        number
        :disabled="!selectedLabel"
        @input="handleCopies"
        outline
        v-model="copies"
        label="Copias"
        v-validate="'required|min_value:1'"
        data-vv-name="copies"
        :error-messages="errors.collect('copies')"/>
    </VFlex>
    <VFlex xs12>
      <span class="subheading">Lote - Consecutivo</span>
    </VFlex>

    <VFlex xs3>
      <VTextField
        number
        :disabled="!selectedLabel"
        outline
        @input="handleInput"
        v-validate="'required|min_value:1'"
        data-vv-name="line"
        :error-messages="errors.collect('line')"
        v-model="line"
        label="Línea" />
    </VFlex>
    <VFlex xs3>
      <VTextField
        number
        :disabled="!selectedLabel"
        outline
        @input="handleInput"
        v-validate="'required|min_value:1'"
        data-vv-name="turn"
        :error-messages="errors.collect('turn')"
        v-model="turn"
        label="Turno" />
    </VFlex>
    <VFlex xs3>
      <VTextField
        outline
        @input="handleInput"
        :disabled="!selectedLabel"
        v-model="group"
        v-validate="'required'"
        data-vv-name="group"
        :error-messages="errors.collect('group')"
        label="Grupo" />
    </VFlex>
    <VFlex xs3>
      <VTextField
        outline
        @input="handleInput"
        :disabled="!selectedLabel"
        v-model="sequential"
        v-validate="'required'"
        data-vv-name="sequential"
        :error-messages="errors.collect('sequential')"
        label="Consecutivo" />
    </VFlex>
  </VLayout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const today = new Date();

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export default {
  // $_veeValidate: { validator: 'new' },
  inject: ['$validator'],
  components: { DatePicker: () => import('@/components/Printer/DatePicker') },
  data() {
    return {
      productionDate: new Date().toISOString().substr(0, 10),
      expireDate: addDays(today, 90).toISOString().substr(0, 10),
      line: 1,
      turn: 1,
      group: 'A',
      sequential: '001',
      copies: 1,
    };
  },
  computed: {
    ...mapState('printer', ['selectedLabel', 'variables']),
    description() {
      return `${this.line}-${this.turn}-${this.group}-${this.sequential}`;
    }
  },
  mounted() {
    Object.keys(this.variables).forEach(key => {
      this.setVariableValue({
        name: key,
        value: this[key]
      });
    });

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
  destroyed() {
    this.$eventHub.$off('validate');
  },
  methods: {
    ...mapMutations('printer', ['setVariableValue', 'setCopies']),
    handleDate(picker, value) {
      console.log(value);
      if (picker === 'production') {
        this.productionDate = value;
        this.setVariableValue({
          name: 'productionDate',
          value
        });
      } else {
        this.expireDate = value;
        this.setVariableValue({
          name: 'expireDate',
          value
        });
      }
      // this.handleChange();
    },
    handleCopies(val) {
      this.setCopies(val);
    },
    handleInput() {
      this.setVariableValue({
        name: 'description',
        value: this.description
      });
    }
  }
};
</script>
