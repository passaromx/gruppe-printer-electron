<template>
  <div>
    <VDialog v-model="dialog" max-width="350" persistent>
      <LabelForm :editedItem="editedItem" @closeDialog="clearForm"/>
    </VDialog>

    <BaseCard>
      <VCardTitle>
        <!-- <h5 class="headline">Precintos</h5> -->
        <VLayout row justify-space-between align-center>
          <VFlex xs4>
            <ClientSelect />
          </VFlex>
          <VFlex xs1 class="text-xs-right">
            <VIcon @click="refreshLabels">refresh</VIcon>
          </VFlex>
        </VLayout>
      </VCardTitle>
      <VDivider />

      <TableHeader
        module="labels"
        :selected="selected"
        @newItem="dialog = true"
        condensed/>

      <VDataTable
        v-model="selected"
        :loading="fetching"
        :headers="headers"
        :items="labels"
        select-all
      >
        <template slot="items" slot-scope="props">
          <td>
            <VCheckbox
              v-model="props.selected"
              primary
              hide-details
            ></VCheckbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.sku }}</td>
          <td class="text-xs-right">
            <a href="javascript:void(0)" @click="previewFile(props.item.authorization)">
              {{ props.item.authorization.name || 'n/a' }}
            </a>
          </td>
          <td>
            <VLayout row justify-center>
              <VTooltip bottom>
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
              </VTooltip>
              <VTooltip bottom>
                <VBtn
                  slot="activator"
                  flat
                  color="grey darken-2"
                  icon
                  @click="previewFile(props.item.labelPdf)"
                >
                  <VIcon>picture_as_pdf</VIcon>
                </VBtn>
                <span>Ver PDF</span>
              </VTooltip>

            </VLayout>

            <!-- <a href="javascript:void(0)" @click="previewFile(props.item.labelPdf)">
              {{ props.item.labelPng.name || 'n/a' }}
            </a> -->
          </td>
          <td>
            <VTooltip bottom>
              <VBtn
                slot="activator"
                flat
                color="grey darken-2"
                icon
                @click="editItem(props.item)"
              >
                <VIcon small>edit</VIcon>
              </VBtn>
              <span>Editar</span>
            </VTooltip>
          </td>
        </template>
      </VDataTable>
    </BaseCard>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { shell, remote } from 'electron';
import { labelListHeaders, filesURL } from '@/api/constants';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    ClientSelect: () => import('@/components/Labels/ClientSelect'),
    LabelForm: () => import('@/components/Labels/LabelForm'),
    TableHeader: () => import('@/components/Shared/TableHeader')
  },
  data() {
    return {
      dialog: false,
      search: '',
      selected: [],
      editedItem: {
        name: null,
        sku: null,
        label: null,
        labelPdf: null,
        labelPng: null,
        authorization: null,
      },
      defaultItem: {
        name: null,
        sku: null,
        label: null,
        labelPdf: null,
        labelPng: null,
        authorization: null,
      },
      headers: labelListHeaders
    };
  },
  mounted() {
    this.$eventHub.$on('clear-selected', () => { this.selected = []; });
  },
  onDestroy() {
    this.$eventHub.$off('clear-selected');
  },
  computed: { ...mapState('labels', ['fetching', 'labels', 'fromClient']) },
  watch: {
    fromClient(val) {
      console.log(val);
      this.fetch(val);
    }
  },
  methods: {
    ...mapActions('labels', ['fetch']),
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialog = true;
    },
    refreshLabels() {
      this.fetch(this.fromClient);
    },
    previewFile(file) {
      // console.log(file);


      const url = `${filesURL}${file.url}`;
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
