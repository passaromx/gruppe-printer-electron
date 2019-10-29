<template>
  <div>
    <VDialog
      v-if="user.role.type === USER_ROLES.ADMINISTRATOR"
      v-model="dialog"
      max-width="350"
      persistent
    >
      <LabelForm :editedItem="editedItem" @closeDialog="clearForm"/>
    </VDialog>

    <BaseCard>
      <VCardTitle>
        <!-- <h5 class="headline">Precintos</h5> -->
        <VLayout row justify-space-between align-center>
          <VFlex xs4>
            <ClientSelect v-if="user.role.type === 'root'" module="labels"/>
          </VFlex>
          <VFlex xs1 class="text-xs-right">
            <VIcon @click="refreshLabels">refresh</VIcon>
          </VFlex>
        </VLayout>
      </VCardTitle>
      <VDivider/>

      <TableHeader
        module="labels"
        :selected="selected"
        :hide-actions="user.role.type !== USER_ROLES.ADMINISTRATOR"
        @newItem="dialog = true"
        @onSearch="handleSearch"
        condensed/>

      <VDataTable
        :search="search"
        v-model="selected"
        :loading="fetching"
        :headers="headers"
        :items="labels"
        :rows-per-page-items="rowsPerPage"
        :select-all="user.role.type === USER_ROLES.ADMINISTRATOR"
      >
        <template slot="items" slot-scope="props">
          <td v-if="user.role.type === USER_ROLES.ADMINISTRATOR">
            <VCheckbox v-model="props.selected" primary hide-details></VCheckbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.sku }}</td>
          <td v-if="user.role.type === USER_ROLES.ADMINISTRATOR" class="text-xs-right">
            <a
              v-if="props.item.authorization"
              href="javascript:void(0)"
              @click="previewFile(props.item.authorization.authPdf)"
            >{{ props.item.authorization.name}}</a>
            <span v-else>Sin autorización</span>
          </td>
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
                  @click="previewFile(props.item.labelPdf)"
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
          <td v-if="user.role.type === USER_ROLES.ADMINISTRATOR" class="text-xs-center">
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
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { shell, remote } from 'electron';
import { LABELS_HEADERS, filesURL, rowsPerPage, USER_ROLES } from '@/api/constants';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    ClientSelect: () => import('@/components/Labels/ClientSelect'),
    LabelForm: () => import('@/components/Labels/LabelForm'),
    TableHeader: () => import('@/components/Shared/TableHeader')
  },
  data() {
    return {
      rowsPerPage,
      dialog: false,
      search: '',
      selected: [],
      USER_ROLES,
      editedItem: {
        name: null,
        sku: null,
        label: null,
        labelPdf: null,
        labelPng: null,
        authorization: null
      },
      defaultItem: {
        name: null,
        sku: null,
        label: null,
        labelPdf: null,
        labelPng: null,
        authorization: null
      },
    };
  },
  mounted() {
    if (this.user.role.type === USER_ROLES.CLIENT_ADMIN) {
      this.setClient(this.user.client._id);
    }

    this.$eventHub.$on('clear-selected', () => {
      this.selected = [];
    });
  },
  onDestroy() {
    this.$eventHub.$off('clear-selected');
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapState('labels', ['fetching', 'labels', 'fromClient']),
    headers() {
      if (this.user.role.type === USER_ROLES.ADMINISTRATOR) {
        return LABELS_HEADERS.ADMIN;
      }

      return LABELS_HEADERS.CLIENT_ADMIN;
    }
  },
  watch: {
    fromClient: {
      handler(val) {
        if (val) {
          this.fetch(val);
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('labels', ['fetch']),
    ...mapMutations('labels', ['setClient']),
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    handleSearch(val) { this.search = val; },
    refreshLabels() {
      this.fetch(this.fromClient);
    },
    previewFile(file) {
      const url = file.url.includes('amazon') ? file.url : `${filesURL}${file.url}`;
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
