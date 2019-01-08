<template>
  <div>
    <VDialog v-model="dialog" max-width="350" persistent>
      <LabelForm :editedItem="editedItem" @closeDialog="clearForm"/>
    </VDialog>

    <BaseCard>
      <VCardTitle>
        <h5 class="headline">Precintos</h5>
        <VSpacer />
        <VIcon @click="fetch">refresh</VIcon>
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
          <td class="text-xs-right">
            <a href="javascript:void(0)" @click="previewFile(props.item.labelPng)">
              {{ props.item.labelPng.name || 'n/a' }}
            </a>
          </td>
          <td>
            <VBtn
              flat
              color="grey darken-2"
              icon
              @click="editItem(props.item)"
            >
              <VIcon small>edit</VIcon>
            </VBtn>
          </td>
        </template>
      </VDataTable>
    </BaseCard>
  </div>
</template>

<script>
import { labelListHeaders } from '@/api/constants';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
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
    if (this.labels.lenght === 0) this.fetch();
  },
  onDestroy() {
    this.$eventHub.$off('clear-selected');
  },
  computed: { ...mapState('labels', ['fetching', 'labels']) },
  methods: {
    ...mapActions('labels', ['fetch']),
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialog = true;
    },
    previewFile(file) {
      console.log(file);
      const url = `http://192.168.3.84:1337${file.url}`;
      window.open(url, file.name);
    },
    clearForm() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  }
};
</script>
