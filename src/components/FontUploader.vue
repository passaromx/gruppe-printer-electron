<template>
  <VDialog v-model="fontDialog" persistent max-width="400px">
    <BaseCard>
      <BaseFormTitle>
        Actualización de Fuentes
        <!-- <span v-if="zebra">{{ zebra.name }} {{ zebra.status }}</span> -->
        <VSpacer />
        <VIcon dark @click="fetchPrinters">refresh</VIcon>
      </BaseFormTitle>
      <VCardText>
        <VForm @keyup.native.enter="validate">
          <VSelect
            :items="printers"
            v-model="selectedPrinter"
            v-validate="'required'"
            data-vv-name="printer"
            :error-messages="errors.collect('printer')"
            label="Selecciona la impresora a actualizar"
            item-text="name"
            item-value="name"/>

          <VExpandTransition>
            <div class="mt-4" v-if="loading">
              <span>Actualizando fuentes, esto puede tardar unos minutos...</span>
              <VProgressLinear indeterminate />
            </div>
          </VExpandTransition>
        </VForm>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          flat
          @click="close"
          :disabled="loading"
          >Cancelar</VBtn>
        <VBtn
          :disabled="loading"
          flat
          @click="validate"
          color="primary">Subir Fuentes</VBtn>
      </VCardActions>
    </BaseCard>
  </VDialog>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
import { mapState, mapMutations } from 'vuex';

export default {
  $_veeValidate: { validator: 'new' },
  data: () => ({
    selectedPrinter: null,
    printers: [],
    loading: false,
    zebra: null
  }),
  mounted() {
    /* setInterval(() => {
      console.log('fetching');
      this.fetchPrinters();
    }, 3000) */
    this.fetchPrinters();

    ipcRenderer.on('printers-fetched', (e, printers) => {
      console.log(printers);
      this.printers = printers;
      this.zebra = this.printers.filter(printer => printer.name === 'ZDesigner 105SLPlus-203dpi ZPL')[0];
      // console.log(this.zebra);
    });
    ipcRenderer.on('fonts-uploaded', () => {
      this.loading = false;
      this.setFontDialog(false);
    });
  },
  computed: { ...mapState(['fontDialog']), },
  methods: {
    ...mapMutations(['setFontDialog']),
    validate() {
      this.$validator.validate().then(res => {
        if (res) this.uploadFonts();
      });
    },
    close() {
      this.loading = false;
      this.setFontDialog(false);
    },
    fetchPrinters() {
      ipcRenderer.send('get-printers');
    },
    uploadFonts() {
      console.log('sending fonts');
      this.loading = true;
      // setInterval(() => {
      //   ipcRenderer.send('get-printers');
      // }, 500);
      ipcRenderer.send('update-fonts', this.selectedPrinter);

      // setTimeout(() => {
      //   this.loading = false;
      //   this.setFontDialog(false);
      // }, 3000);
    }
  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners('printers-fetched');
    ipcRenderer.removeAllListeners('fonts-uploaded');
  }
};
</script>
