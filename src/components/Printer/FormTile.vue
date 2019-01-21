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
        </VLayout>
        <Form
          v-if="this.user"
          :client="this.user.client._id"
        />
        <!-- <span>{{ description }}</span> -->
        <VLayout justify-end>
          <VBtn>
            <VIcon class="mr-2">cloud_download</VIcon>
            PDF
          </VBtn>
          <VBtn
            @click="validate"
            :disabled="errors.items.length > 0"
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
import { mapState, mapMutations, mapActions } from 'vuex';
import { nymVars } from '@/api/constants';

export default {
  $_veeValidate: { validator: 'new' },
  components: {
    LabelAutocomplete: () => import('@/components/Printer/LabelAutocomplete'),
    Form: () => import('@/components/Printer/Forms/Form')
  },
  data() {
    return {
      printer: 'Zebra_Technologies_ZTC_110Xi4_203dpi_ZPL',
      printers: [],
      place: 'TX',
      weight: 1,
      zpl: '',
      nymVars
    };
  },
  mounted() {
    this.setVariables(this.nymVars.fields);
    this.setDescriptionFormat(this.nymVars.descriptionFormat);

    ipcRenderer.send('get-printers');
    ipcRenderer.on('printers-fetched', (e, printers) => {
      this.printers = printers;
    });
    ipcRenderer.on('zplReady', (e, zpl) => {
      this.zpl = zpl;
    });
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('printer', ['selectedLabel', 'variables', 'copies']),
    description() {
      return `${this.line}-${this.turn}-${this.group}-${this.sequential}`;
    }
  },
  methods: {
    ...mapActions('printer', ['updateSysInfo']),
    ...mapMutations('printer', ['setPreviewLoader', 'setVariables', 'setDescriptionFormat', 'setSelectedLabel']),
    handleChange() {
      if (this.selectedLabel) {
        const data = {
          description: '',
          expireDate: '',
          productionDate: ''
        };
        console.log(data);
        // this.setPreviewLoader(true);
      }
    },
    validate() {
      const variables = { ...this.variables.fields };
      Object.keys(variables).forEach(key => {
        variables[key] = variables[key].value;
      });
      const data = {
        ...variables,
        copies: this.copies,
      };

      const printData = {
        ...data,
        client: this.user.client._id
      };

      ipcRenderer.send('print', this.printer, this.selectedLabel, printData);
      // update sys info
      const systemInfo = JSON.parse(localStorage.getItem('systemInfo'));
      systemInfo.printerName = this.printer;
      systemInfo.print = {
        date: new Date().toISOString(),
        label: this.selectedLabel._id,
        data,
        user: this.user._id
      };
      console.log(systemInfo);
      this.updateSysInfo(systemInfo);
    }
  },
  beforeDestroy() {
    this.setSelectedLabel(null);
  }
};
</script>
