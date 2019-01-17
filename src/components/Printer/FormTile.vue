<template>
  <BaseCard flat :isFullHeight="true">
    <VCardTitle>
      <h5 class="headline">Imprimir</h5>
    </VCardTitle>
    <!-- <VDivider /> -->
    <VCardText>
      <VContainer class="pa-0" grid-list-md>
        <VLayout row wrap>
          <VFlex xs12>
            <VSelect
              :items="printers"
              v-model="printer"
              label="Impresora"
              outline
              item-text="name"
              item-value="name"/>
          </VFlex>
          <VFlex xs12>
            <LabelAutocomplete
              name="labels"
              @change="handleChange"
              v-validate="'required'"
              :messages="errors.collect('labels')"/>
          </VFlex>
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
              outline
              v-model="copies"
              label="Copias"
              v-validate="'required|min_value:1'"
              data-vv-name="copies"
              :error-messages="errors.collect('copies')"/>
          </VFlex>
          <!-- <VFlex xs6>
            <VTextField
              :disabled="!selectedLabel"
              outline
              v-validate="'required'"
              data-vv-name="place"
              :error-messages="errors.collect('place')"
              v-model="place"
              label="Planta" />
          </VFlex> -->
          <!-- <VFlex xs3>
            <VTextField
              number
              :disabled="!selectedLabel"
              outline
              v-validate="'required|min_value:1'"
              data-vv-name="weight"
              :error-messages="errors.collect('weight')"
              v-model="weight"
              label="Peso neto" />
          </VFlex> -->
          <VFlex xs12>
            <span class="subheading">Nomenclatura</span>
          </VFlex>

          <VFlex xs3>
            <VTextField
              number
              :disabled="!selectedLabel"
              outline
              @change="handleChange"
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
              @change="handleChange"
              v-validate="'required|min_value:1'"
              data-vv-name="turn"
              :error-messages="errors.collect('turn')"
              v-model="turn"
              label="Turno" />
          </VFlex>
          <VFlex xs3>
            <VTextField
              outline
              :disabled="!selectedLabel"
              v-model="group"
              @change="handleChange"
              v-validate="'required'"
              data-vv-name="group"
              :error-messages="errors.collect('group')"
              label="Grupo" />
          </VFlex>
          <VFlex xs3>
            <VTextField
              outline
              :disabled="!selectedLabel"
              v-model="sequential"
              @change="handleChange"
              v-validate="'required'"
              data-vv-name="sequential"
              :error-messages="errors.collect('sequential')"
              label="Consecutivo" />
          </VFlex>
        </VLayout>
        <!-- <span>{{ description }}</span> -->
        <VLayout justify-end>
          <VBtn>
            <VIcon class="mr-2">cloud_download</VIcon>
            PDF
          </VBtn>
          <VBtn
            @click="validate"
            :disabled="errors.any()"
            color="primary"
          >
            Imprimir
          </VBtn>
        </VLayout>
      </VContainer>
    </VCardText>
  </BaseCard>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
import { mapState, mapMutations } from 'vuex';

const today = new Date();

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export default {
  $_veeValidate: { validator: 'new' },
  components: {
    LabelAutocomplete: () => import('@/components/Printer/LabelAutocomplete'),
    DatePicker: () => import('@/components/Printer/DatePicker')
  },
  data() {
    return {
      printer: 'Zebra_Technologies_ZTC_110Xi4_203dpi_ZPL',
      printers: [],
      place: 'TX',
      copies: 1,
      productionDate: new Date().toISOString().substr(0, 10),
      expireDate: addDays(today, 90).toISOString().substr(0, 10),
      weight: 1,
      line: 4,
      turn: 2,
      group: 'C',
      sequential: '001',
      zpl: ''
    };
  },
  mounted() {
    ipcRenderer.send('get-printers');
    ipcRenderer.on('printers-fetched', (e, printers) => {
      this.printers = printers;
    });
    ipcRenderer.on('zplReady', (e, zpl) => {
      this.zpl = zpl;
    });
  },
  computed: {
    ...mapState('printer', ['selectedLabel']),
    description() {
      return `${this.line}-${this.turn}-${this.group}-${this.sequential}`;
    }
  },
  methods: {
    ...mapMutations('printer', ['setPreviewLoader']),
    handleDate(picker, value) {
      if (picker === 'production') {
        this.productionDate = value;
      } else {
        this.expireDate = value;
      }
      this.handleChange();
    },
    handleChange() {
      if (this.selectedLabel) {
        const data = {
          description: this.description,
          expireDate: this.expireDate,
          productionDate: this.productionDate
        };
        console.log(data);
        // this.setPreviewLoader(true);
      }
    },
    validate() {
      const data = {
        description: this.description,
        expireDate: this.expireDate,
        productionDate: this.productionDate
      };
      ipcRenderer.send('print', this.printer, this.selectedLabel, data);
    }
  }
};
</script>
