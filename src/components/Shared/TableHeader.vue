<template>
  <div>
    <VDialog v-model="downloadDialog" max-width="300" persistent>
      <VCard
        color="secondary"
        dark
      >
        <VCardText>
          <span v-if="currentState === PDF_DOWNLOAD_STATE.DOWNLOADING">
            Descargando {{ currentDownload }} de {{ selected.length }}, esto puede tomar unos minutos
          </span>
          <span v-if="currentState === PDF_DOWNLOAD_STATE.PACKAGING">
            Comprimiendo descarga...
          </span>
          <span v-if="currentState === PDF_DOWNLOAD_STATE.READY">
            Listo! Haz click en el botón para ver tu descarga en el buscador
          </span>
          <VProgressLinear
            v-model="progress"
            color="white"
            class="mb-0"
          ></VProgressLinear>
        </VCardText>
        <VCardActions v-if="currentState === PDF_DOWNLOAD_STATE.READY">
          <VBtn
            color="primary"
            @click="revealInFinder"
          >
            Ver Descarga
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VExpandTransition>
      <div v-if="selected.length > 0" class="delete-bar">
        <VContainer fluid class="py-0" style="height: 100%">
          <VLayout
            fill-height
            row
            justify-space-between
            align-center
          >
            <span>
              {{ selected.length }} registro{{ selected.length > 1 ? 's' : '' }}
              selecionado{{ selected.length > 1 ? 's' : '' }}
            </span>
            <div>
              <VBtn
                class="mx-0"
                flat
                color="secondary"
                @click="downloadItems"
              >
                <VIcon class="mr-2">archive</VIcon>
                Descargar PDF
              </VBtn>
              <VBtn
                class="mx-0"
                flat
                color="red"
                @click="deleteItems"
              >
                <VIcon class="mr-2">delete</VIcon>
                Borrar
              </VBtn>
            </div>

          </VLayout>
        </VContainer>

      </div>
    </VExpandTransition>
    <VCardTitle>
      <VLayout row wrap>
        <VFlex xs12 v-bind:class="[ condensed ? 'sm3' : 'sm6']">
          <VTextField
            class="pt-0"
            v-model="search"
            @input="handleInput"
            placeholder="Buscar..."
            append-icon="search"
            hide-details
            clearable
          />
        </VFlex>
        <VFlex xs12 v-bind:class="[ condensed ? 'sm9' : 'sm6']" v-if="!hideActions">
          <VLayout row justify-end>
            <VBtn
              v-if="filters"
              class="mx-0"
              flat
              color="secondary"
              @click="$emit('newItem')"
            >
              <VIcon class="mr-2">filter_list</VIcon>
              Filtros
            </VBtn>
            <VBtn
              class="mx-0"
              flat
              color="secondary"
              @click="$emit('newItem')"
            >
              <VIcon class="mr-2">add</VIcon>
              Crear
            </VBtn>
          </VLayout>
        </VFlex>
      </VLayout>
    </VCardTitle>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { shell } from 'electron';
import { authAxios } from '@/plugins/axios';
import JSZip from 'jszip';
// import JSZipUtils from 'jszip-utils';
import { saveAs } from 'save-as';
import { mapMutations } from 'vuex';
import { PDF_DOWNLOAD_STATE } from '@/api/constants';

export default {
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    filters: Array,
    condensed: {
      type: Boolean,
      default: false
    },
    module: String,
    hideActions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      downloadDialog: false,
      PDF_DOWNLOAD_STATE,
      currentState: PDF_DOWNLOAD_STATE.IDLE,
      currentDownload: 0,
      progress: 0,
    };
  },
  methods: {
    ...mapMutations(['setToDelete']),
    handleInput(val) {
      this.$emit('onSearch', val);
    },
    deleteItems() {
      const toDelete = {
        items: this.selected,
        module: this.module
      };
      this.setToDelete(toDelete);
    },
    async downloadFileAsBlob(url) {
      try {
        // console.log(authAxios.defaults);
        // delete authAxios.defaults.headers.common.Authorization;
        const response = await authAxios({
          url,
          method: 'GET',
          responseType: 'blob'
        });

        return new Blob([response.data]);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async downloadItems() {
      this.downloadDialog = true;
      let token = '';
      console.log('download', this.selected);
      const zip = new JSZip();
      const downloads = this.selected.map(label => {
        console.log('label', label);
        const { url } = label.labelPdf;
        let { name } = label;
        name += '.pdf';
        return {
          url,
          name
        };
      });

      console.log(downloads);

      this.currentState = PDF_DOWNLOAD_STATE.DOWNLOADING;

      if (authAxios.defaults.headers.common.Authorization) {
        token = authAxios.defaults.headers.common.Authorization;
        delete authAxios.defaults.headers.common.Authorization;
      }
      for (let i = 0; i < downloads.length; i++) {
        this.currentDownload = i + 1;
        this.progress = Math.floor(this.currentDownload * 100 / this.selected.length);
        /* eslint-disable-next-line */
        const data = await this.downloadFileAsBlob(downloads[i].url);
        if (data) {
          // console.log('data', data);
          zip.file(downloads[i].name, data, { binary: true });
        }
      }
      authAxios.defaults.headers.common.Authorization = token;
      this.progress = 0;

      // console.log('zip', zip);

      // downloads.forEach((download, index) => {
      //   JSZipUtils.getBinaryContent(download.url, (err, data) => {
      //     if (err) {
      //       console.log('error', err);
      //       throw err;
      //     }
      //     zip.file(download.name, data, { binary: true });
      //   });
      // });

      this.currentState = PDF_DOWNLOAD_STATE.PACKAGING;
      zip.generateAsync({ type: 'blob' }, metadata => {
        this.progress = Math.floor(metadata.percent);
      })
        .then(content => {
          saveAs(content, 'Precintos');
          // console.log('done');
          this.currentState = PDF_DOWNLOAD_STATE.READY;
        });
    },
    revealInFinder() {
      shell.showItemInFolder('C:Downloads');
      this.currentState = PDF_DOWNLOAD_STATE.IDLE;
      this.progress = 0;
      this.downloadDialog = false;
    }
  }
};
</script>

<style scoped>
.delete-bar {
  background-color: #e0e0e0;
  position: absolute;
  width: 100%;
  height: 65px;
  /* border-radius: 3px 3px 0 0; */
  z-index: 2;
}
</style>
