<template>
  <VDialog v-model="fontDialog" persistent max-width="400px">
    <BaseCard>
      <BaseFormTitle>Actualización de Fuentes</BaseFormTitle>
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
              <span>Actualizando fuentes, esto puede tardar unos minutos.</span>
              <VProgressLinear indeterminate />
            </div>
          </VExpandTransition>
        </VForm>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          :disabled="loading"
          flat
          @click="setFontDialog(false)"
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
    loading: false
  }),
  mounted() {
    ipcRenderer.send('get-printers');

    ipcRenderer.on('printers-fetched', (e, printers) => {
      this.printers = printers;
    });
    ipcRenderer.on('fonts-uploaded', () => {
      // dismiss loader && modal
    });
  },
  computed: { ...mapState(['fontDialog']) },
  methods: {
    ...mapMutations(['setFontDialog']),
    validate() {
      this.$validator.validate().then(res => {
        if (res) this.uploadFonts();
      });
    },
    uploadFonts() {
      console.log('sending fonts');
      this.loading = true;
      // setInterval(() => {
      //   ipcRenderer.send('get-printers');
      // }, 500);
      ipcRenderer.send('update-fonts', this.selectedPrinter);

      setTimeout(() => {
        this.loading = false;
        this.setFontDialog(false);
      }, 3000);
    }
  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners('printers-fetched');
    ipcRenderer.removeAllListeners('fonts-uploaded');
  }
};
</script>
