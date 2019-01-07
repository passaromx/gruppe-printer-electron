<template>
  <div>
    <VDialog v-model="dialog" max-width="350" persistent>
      <LabelForm :editedItem="editedItem" @closeDialog="dialog = false"/>
    </VDialog>

    <BaseCard>
      <VCardTitle>
        <h5 class="headline">Precintos</h5>
        <VSpacer />
        <VIcon>refresh</VIcon>
      </VCardTitle>
      <VDivider />

      <TableHeader :selected="selected" @newItem="dialog = true" condensed/>

      <VDataTable
        v-model="selected"
        :loading="fetching"
        :headers="headers"
        :items="labels"
        item-key="name"
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
          <td class="text-xs-right">{{ props.item.labelPng.name || 'n/a' }}</td>
          <td class="text-xs-right">{{ props.item.labelPng.name || 'n/a' }}</td>
        </template>
      </VDataTable>
    </BaseCard>
  </div>
</template>

<script>
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
        labelFile: null,
        authFile: null,
        pdfPath: null,
        pngPath: null
      },
      headers: [
        {
          text: 'Precinto',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'SKU',
          value: 'sku',
          align: 'right'
        },
        {
          text: 'Autorización',
          value: 'auth',
          align: 'right'
        },
        {
          text: 'Etiqueta',
          value: 'label',
          align: 'right'
        }
      ],
    };
  },
  mounted() {
    this.fetch();
  },
  computed: { ...mapState('labels', ['fetching', 'labels']) },
  methods: { ...mapActions('labels', ['fetch']) }
};
</script>
