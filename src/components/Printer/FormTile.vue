<template>
  <BaseCard flat :isFullHeight="true">
    <VCardTitle>
      <h5 class="headline">Imprimir</h5>
    </VCardTitle>
    <!-- <VDivider /> -->
    <VCardText>
      <VContainer class="pa-0" grid-list-lg>
        <VLayout row wrap>
          <VFlex xs12>
            <VSelect
              :items="printers"
              v-model="printer"
              label="Impresora"
              outline
              hide-details
              ref="displayName"
              item-text="displayName"
              item-value="name"/>
          </VFlex>
          <VFlex xs12>
            <LabelAutocomplete
              name="labels"
              @change="handleChange"
              v-validate="'required'"
              :messages="errors.collect('labels')"/>
          </VFlex>
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
          :client="this.user.client._id" />
        <VLayout row justify-start class="mt-3">
          <VFlex xs6>
            <VTextField
              outline
              type="number"
              label="Copias"
              :disabled="!selectedLabel"
              v-validate="'required|min_value:1|max_value:5000'"
              data-vv-name="copies"
              :error-messages="errors.collect('copies')"
              :value="1" />
          </VFlex>
        </VLayout>
        <VLayout justify-end>
          <VBtn :disabled="!selectedLabel">
            <!-- <VIcon class="mr-2">picture_as_pdf</VIcon> -->
            Ver PDF
          </VBtn>
          <VBtn
            @click="validate"
            :disabled="errors.items.length > 0 || !selectedLabel"
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { nymVars, thyssenVars } from '@/api/constants';

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
      nymVars,
      thyssenVars,
      resize: false,
      timeout: null
    };
  },
  mounted() {
    // const vars = this.user.client._id === '5c40b928a5888531a0076cbd'
    //   ? this.nymVars
    //   : this.thyssenVars;
    // this.setVariables(vars);

    // this.setDescriptionFormat(this.thyssenVars.descriptionFormat);
    ipcRenderer.send('get-printers');
    ipcRenderer.on('printers-fetched', (e, printers) => {
      this.printers = printers;
      this.formatDisplayPrinters();
    });
    ipcRenderer.on('zplReady', (e, zpl) => {
      this.zpl = zpl;
    });
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        const vars = this.user.client._id === '5c40b928a5888531a0076cbd'
          ? this.nymVars
          : this.thyssenVars;
        this.setVariables(vars);
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('auth', ['user']),
    ...mapState('printer', ['selectedLabel', 'variables', 'copies']),
    description() {
      return `${this.line}-${this.turn}-${this.group}-${this.sequential}`;
    },
    displayPrinters() {
      if (this.$refs.displayName) {
        let displayNameLength = this.$refs.displayName.$el.clientWidth;
        displayNameLength = (displayNameLength / 11) - (350 / displayNameLength);
        return this.printers.map(printer => {
          printer.displayName = `${printer.name.substr(0, displayNameLength)}...`;
          return printer;
        });
      }
      return this.printers;
    }
  },
  methods: {
    ...mapActions('printer', ['updateSysInfo']),
    ...mapMutations('printer', ['setPreviewLoader', 'setVariables', 'setDescriptionFormat', 'setSelectedLabel']),
    formatDisplayPrinters() {
      this.timeout = setTimeout(() => { this.printers = this.displayPrinters; }, 500);
      window.addEventListener('resize', () => {
        this.printers = this.displayPrinters;
      });
    },
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

      ipcRenderer.send('print', this.printer, this.selectedLabel, printData, this.user.client.settings.format);
      // update sys info
      const systemInfo = JSON.parse(localStorage.getItem('systemInfo'));
      systemInfo.printerName = this.printer;
      systemInfo.print = {
        date: new Date().toISOString(),
        label: this.selectedLabel._id,
        data,
        user: this.user._id
      };
      this.updateSysInfo(systemInfo);
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', console.log('removed'));
    ipcRenderer.removeAllListeners('printers-fetched');
    ipcRenderer.removeAllListeners('zplReady');
    this.setSelectedLabel(null);
  }
};
</script>
