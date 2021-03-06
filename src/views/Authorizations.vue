<template>
  <VContainer>
    <VDialog v-model="dialog" max-width="350" persistent>
      <AuthorizationForm :editedItem="editedItem" @closeDialog="clearForm"/>
    </VDialog>

    <VLayout row>
      <VAvatar color="primary">
        <VIcon dark>picture_as_pdf</VIcon>
      </VAvatar>
      <h5 class="display-1 mt-1 mb-4 ml-3">Autorizaciones</h5>
    </VLayout>


    <BaseCard>
      <VCardTitle>
        <!-- <h5 class="headline">Precintos</h5> -->
        <VLayout row justify-space-between align-center>
          <VFlex xs4>
            <ClientSelect/>
          </VFlex>
          <VFlex xs1 class="text-xs-right">
            <VIcon @click="refreshLabels">refresh</VIcon>
          </VFlex>
        </VLayout>
      </VCardTitle>
      <VDivider/>

      <TableHeader
        module="authorizations"
        :selected="selected"
        @newItem="dialog = true"
        @onSearch="handleSearch"
        condensed/>

      <VDataTable
        :search="search"
        v-model="selected"
        :loading="fetching"
        :headers="headers"
        :items="authorizations"
        :rows-per-page-items="rowsPerPage"
        select-all
      >
        <template slot="items" slot-scope="props">
          <td>
            <VCheckbox v-model="props.selected" primary hide-details></VCheckbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td>
            <VLayout row justify-center>
              <!-- <VTooltip bottom>
                <VBtn
                  slot="activator"
                  flat
                  color="grey darken-2"
                  icon
                  @click="previewFile(props.item.labelPng)"
                >
                  <VIcon>image</VIcon>
                </VBtn>
                <span>Ver imagen</span>
              </VTooltip> -->
              <VTooltip bottom>
                <VBtn
                  slot="activator"
                  flat
                  color="grey darken-2"
                  icon
                  @click="previewFile(props.item.authPdf)"
                >
                  <VIcon>picture_as_pdf</VIcon>
                </VBtn>
                <span>Ver PDF</span>
              </VTooltip>
            </VLayout>

            <!-- <a href="javascript:void(0)" @click="previewFile(props.item.labelPdf)">
              {{ props.item.labelPng.name || 'n/a' }}
            </a>-->
          </td>
          <td class="text-xs-center">
            <VTooltip bottom>
              <VBtn
                slot="activator"
                flat
                color="grey darken-2"
                icon
                @click="editItem(props.item)">
                <VIcon small>edit</VIcon>
              </VBtn>
              <span>Editar</span>
            </VTooltip>
          </td>
        </template>
      </VDataTable>
    </BaseCard>
  </VContainer>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { shell, remote } from 'electron';
import { authorizationListHeaders, rowsPerPage } from '@/api/constants';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    ClientSelect: () => import('@/components/Authorizations/ClientSelect'),
    AuthorizationForm: () => import('@/components/Authorizations/AuthorizationForm'),
    TableHeader: () => import('@/components/Shared/TableHeader')
  },
  data() {
    return {
      rowsPerPage,
      dialog: false,
      search: '',
      selected: [],
      editedItem: {
        name: null,
        authPdf: null
      },
      defaultItem: {
        name: null,
        authPdf: null
      },
      headers: authorizationListHeaders
    };
  },
  mounted() {
    this.$eventHub.$on('clear-selected', () => {
      this.selected = [];
    });
  },
  onDestroy() {
    this.$eventHub.$off('clear-selected');
  },
  computed: { ...mapState('authorizations', ['fetching', 'authorizations', 'fromClient']) },
  watch: {
    fromClient(val) {
      this.fetch(val);
    }
  },
  methods: {
    ...mapActions('authorizations', ['fetch']),
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    handleSearch(val) { this.search = val; },
    refreshLabels() {
      this.fetch(this.fromClient);
    },
    previewFile(file) {
      const url = `${file.url}`;
      if (url.includes('.pdf')) {
        shell.openExternal(url);
      } else {
        let win = new remote.BrowserWindow({
          width: 500,
          height: 800,
          webPreferences: { plugins: true }
        });
        win.loadURL(url);
        win.setMenu(null);
        win.on('closed', () => {
          win = null;
        });
      }
    },
    clearForm() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  }
};
</script>
