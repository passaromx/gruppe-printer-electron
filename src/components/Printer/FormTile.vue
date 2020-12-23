<template>
  <BaseCard flat :isFullHeight="true">
    <VCardTitle>
      <h5 class="headline">Imprimir</h5>
    </VCardTitle>
    <VDivider class="elevation-1" v-show="divider"/>
    <VuePerfectScrollbar
      :settings="scrollSettings"
      @ps-scroll-down="handleScroll"
      @ps-y-reach-start="handleScroll"
    >
      <VCardText style="max-height: 87vh">
        <VContainer class="pa-0" grid-list-lg>
          <VLayout row wrap>
            <VFlex xs12>
              <VSelect
                :items="printers"
                :loading="fetchingPrinters"
                v-model="printer"
                label="Impresora"
                outline
                hide-details
                return-object
                ref="printers"
                item-text="displayName"
                item-value="name"
              />
            </VFlex>
            <VFlex xs12 class="pt-0">
              <span>
                Si no encuentras la impresora que buscas haz
                <span
                  class="blue--text text--darken-3 printer-refresh font-weight-medium"
                  @click="getPrinters"
                >click aquí</span>
              </span>
            </VFlex>

            <VFlex xs12>
              <LabelAutocomplete
                name="labels"
                v-validate="'required'"
                :messages="errors.collect('labels')"
              />
            </VFlex>
            <VFlex
              xs12
              v-if="user && (user.client._id === clients.malta ||
                user.client._id === clients.myn ||
                user.client._id === clients.maltaPets ||
                user.client._id === clients.maltaBarcode
              )"
            >
              <VSwitch
                v-model="isMock"
                color="primary"
                label="Impresión de maquila"
                hide-details
                @change="toggleMock"
              />
            </VFlex>
          </VLayout>
          <Form v-if="this.user" :client="this.user.client._id" :isMock="isMock"/>
          <VLayout row justify-start class="mt-3">
            <VFlex xs6>
              <VTextField
                outline
                data-vv-name="copies"
                v-validate="'required|min_value:1|max_value:5000'"
                :error-messages="errors.collect('copies')"
                label="Copias"
                :value="copies"
                @input="handleCopies"
              />
            </VFlex>
          </VLayout>
          <VLayout justify-end>
            <VBtn
              class="mx-2"
              block
              :disabled="!selectedLabel"
              @click="viewPdf"
            >
              Ver PDF
            </VBtn>
            <VBtn
              class="mx-2"
              block
              :disabled="errors.items.length > 0 || !selectedLabel || !printer.name || !canPrint"
              color="primary"
              @click="print"
            >Imprimir</VBtn>

          </VLayout>
          <VBtn
            v-if="selectedLabel && selectedLabel.settings.score"
            block
            dark
            color="secondary"
            :disabled="!printer.name"
            @click="cancelAll"
            >Cancelar</VBtn>
        </VContainer>
      </VCardText>
    </VuePerfectScrollbar>
  </BaseCard>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer, shell } from 'electron';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import {
  mynVars, maltaVars, wisiumVars, clients, maltaExportVars, maltaPetsVars, microsVars, maltaBarcodeVars, wisiumhVars, wisiumvVars
} from '@/api/constants';

export default {
  $_veeValidate: { validator: 'new' },
  components: {
    LabelAutocomplete: () => import('@/components/Printer/LabelAutocomplete'),
    Form: () => import('@/components/Printer/Forms/Form'),
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar')
  },
  data() {
    return {
      clients,
      isMock: false,
      scrollSettings: { maxScrollbarLength: 160 },
      firstFetch: true,
      fetchingPrinters: false,
      printer: {},
      printers: [],
      place: 'TX',
      weight: 1,
      mynVars,
      maltaVars,
      maltaExportVars,
      maltaPetsVars,
      maltaBarcodeVars,
      wisiumVars,
      microsVars,
      wisiumhVars,
      wisiumvVars,
      resize: false,
      timeout: null,
      divider: false
    };
  },
  mounted() {
    this.getPrinters();
    ipcRenderer.on('url-ready', (e, url) => {
      let formattedUrl = url.replace(/\\/g, '/');
      formattedUrl = formattedUrl.replace('//uploads', '/uploads');
      shell.openItem(formattedUrl);
    });
    ipcRenderer.on('printers-fetched', (e, printers) => {
      setTimeout(() => {
        if (!this.firstFetch) {
          this.$refs.printers.focus();
          this.$refs.printers.activateMenu();
        }
        if (this.firstFetch) this.firstFetch = false;
        this.fetchingPrinters = false;
      }, 500);
      this.printers = printers;
      this.formatDisplayPrinters();
    });

    if (this.user && this.user.client) this.setClientVariables();
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.setClientVariables();
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
    canPrint() {
      console.log(this.variables);
      if (this.variables) {
        let hasNulledfield = false;
        Object.keys(this.variables.fields).forEach(key => {
          const { type, value } = this.variables.fields[key];
          if (type === 'text' || type === 'select' || type === 'data') {
            if (!value) { hasNulledfield = true; }
          }
        });

        console.log(hasNulledfield);

        return !hasNulledfield;
      }

      return false;
    },
    displayPrinters() {
      if (this.$refs.printers) {
        let displayNameLength = this.$refs.printers.$el.clientWidth;
        displayNameLength = displayNameLength / 11 - 350 / displayNameLength;
        return this.printers.map(printer => {
          const name = printer.description.length
            ? printer.description
            : printer.name;
          printer.displayName = `${name.substr(0, displayNameLength)} ${
            name.length > displayNameLength ? '...' : ''
          }`;
          return printer;
        });
      }
      return this.printers;
    }
  },
  methods: {
    ...mapActions('printer', ['updateSysInfo']),
    ...mapMutations('printer', [
      'setPreviewLoader',
      'setVariables',
      'setDescriptionFormat',
      'setDescriptionFormatM',
      'setSelectedLabel',
      'setCopies'
    ]),
    viewPdf() {
      ipcRenderer.send(
        'view-pdf',
        this.user.client._id,
        this.selectedLabel.labelPdf.url
      );
    },
    toggleMock(val) {
      this.$eventHub.$emit('toggle-mock', val);
    },
    formatDisplayPrinters() {
      this.timeout = setTimeout(() => {
        this.printers = this.displayPrinters;
      }, 500);
      window.addEventListener('resize', () => {
        this.printers = this.displayPrinters;
      });
    },
    getPrinters() {
      this.fetchingPrinters = true;
      ipcRenderer.send('get-printers');
    },

    setClientVariables() {
      let vars = this.maltaVars;
      const clientId = this.user.client._id;
      if (clientId === clients.myn) {
        vars = this.mynVars;
      } else if (clientId === clients.wisium || clientId === clients.wisiumi) {
        vars = this.wisiumVars;
      } else if (clientId === clients.maltaExport) {
        vars = this.maltaExportVars;
      } else if (clientId === clients.maltaPets) {
        vars = this.maltaPetsVars;
      } else if (clientId === clients.maltaBarcode) {
        vars = this.maltaBarcodeVars;
      } else if (clientId === clients.micros) {
        vars = this.microsVars;
      } else if (clientId === clients.wisiumh) {
        vars = this.wisiumhVars;
      } else if (clientId === clients.wisiumv) {
        vars = this.wisiumvVars;
      }
      this.setVariables(vars);
    },
    handleScroll(e) {
      this.divider = e.type === 'ps-scroll-down';
    },
    handleCopies(val) {
      this.setCopies(val);
    },
    cancelAll() {
      ipcRenderer.send('cancelAll', this.printer.name);
    },
    print() {
      const variables = { ...this.variables.fields };
      Object.keys(variables).forEach(key => {
        variables[key] = variables[key].value;
      });
      variables.isMock = this.isMock;
      let data = {
        ...variables,
        user: this.user.email,
        copies: +this.copies
      };

      if (this.selectedLabel.settings) {
        data = {
          ...data,
          ...this.selectedLabel.settings
        };
      }

      const printData = {
        ...data,
        client: this.user.client._id
      };
      ipcRenderer.send(
        'print',
        this.printer.name,
        this.selectedLabel,
        printData,
        this.user.client.settings
      );
      // update sys info
      const systemInfo = JSON.parse(localStorage.getItem('systemInfo'));
      systemInfo.printerName = this.printer.description.length
        ? this.printer.description
        : this.printer.name;
      systemInfo.print = {
        date: new Date().toISOString(),
        label: this.selectedLabel._id,
        data,
        user: this.user._id
      };
      this.updateSysInfo(systemInfo);
      // clear print Data, leaving this commented for further reference
      // this.$eventHub.$emit('clear-inputs');
      this.setCopies(1);
    }
  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners('printers-fetched');
    ipcRenderer.removeAllListeners('url-ready');
    this.setSelectedLabel(null);
  }
};
</script>

<style scoped>
.printer-refresh:hover {
  cursor: pointer;
}
</style>
