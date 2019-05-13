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
          </VLayout>
          <Form v-if="this.user" :client="this.user.client._id"/>
          <VLayout row justify-start class="mt-3">
            <VFlex xs6>
              <VTextField
                outline
                @input="handleCopies"
                data-vv-name="copies"
                v-validate="'required|min_value:1|max_value:5000'"
                :error-messages="errors.collect('copies')"
                label="Copias"
                :value="1"
              />
            </VFlex>
          </VLayout>
          <VLayout justify-end>
            <VBtn @click="viewPdf" :disabled="!selectedLabel">
              <!-- <VIcon class="mr-2">cloud_download</VIcon> -->
              Ver PDF
            </VBtn>
            <VBtn
              @click="print"
              :disabled="errors.items.length > 0 || !selectedLabel || !printer.name"
              color="primary"
            >Imprimir</VBtn>
          </VLayout>
        </VContainer>
      </VCardText>
    </VuePerfectScrollbar>
  </BaseCard>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { mynVars, maltaVars, wisiumVars, clients } from '@/api/constants';

export default {
  $_veeValidate: { validator: 'new' },
  components: {
    LabelAutocomplete: () => import('@/components/Printer/LabelAutocomplete'),
    Form: () => import('@/components/Printer/Forms/Form'),
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar')
  },
  data() {
    return {
      scrollSettings: { maxScrollbarLength: 160 },
      firstFetch: true,
      fetchingPrinters: false,
      printer: {},
      printers: [],
      place: 'TX',
      weight: 1,
      mynVars,
      maltaVars,
      wisiumVars,
      resize: false,
      timeout: null,
      divider: false
    };
  },
  mounted() {
    this.getPrinters();
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
      } else if (clientId === clients.wisium) {
        vars = this.wisiumVars;
      }
      this.setVariables(vars);
    },
    handleScroll(e) {
      this.divider = e.type === 'ps-scroll-down';
    },
    handleCopies(val) {
      this.setCopies(val);
    },
    print() {
      const variables = { ...this.variables.fields };
      Object.keys(variables).forEach(key => {
        variables[key] = variables[key].value;
      });
      const data = {
        ...variables,
        copies: +this.copies
      };

      const printData = {
        ...data,
        client: this.user.client._id
      };

      ipcRenderer.send(
        'print',
        this.printer.name,
        this.selectedLabel,
        printData,
        this.user.client.settings.format
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
    }
  },
  beforeDestroy() {
    // window.removeEventListener('resize', console.log('removed'));
    ipcRenderer.removeAllListeners('printers-fetched');
    this.setSelectedLabel(null);
  }
};
</script>

<style scoped>
.printer-refresh:hover {
  cursor: pointer;
}
</style>
