<template>
  <div>
    <BaseCard>
      <VCardTitle>
        <h5 class="headline">Clientes</h5>
        <VSpacer />
        <VIcon @click="fetch">refresh</VIcon>
      </VCardTitle>
      <VDivider />

      <TableHeader @newItem="newItem" @onSearch="handleSearch"/>

      <VDataTable
        :search="search"
        :loading="fetching"
        :headers="userListHeaders"
        :items="clients"
      >
        <template slot="items" slot-scope="props">
          <tr :active="selectedClient._id === props.item._id" @click="setSelectedClient(props.item)">
            <!-- <td>
              <VCheckbox
                v-model="props.selected"
                primary
                hide-details
              ></VCheckbox>
            </td> -->
            <td>{{ props.item.name }}</td>
            <td class="justify-center layout px-0">
              <VIcon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </VIcon>
              <VIcon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </VIcon>
            </td>
          </tr>
        </template>
      </VDataTable>
    </BaseCard>
  </div>

</template>

<script>
import { userListHeaders } from '@/api/constants';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  components: {
    TableHeader: () => import('@/components/Shared/TableHeader'),
    // ClientForm: () => import('@/components/Clients/ClientForm')
  },
  data() {
    return {
      userListHeaders,
      search: '',
      dialog: false,
      editedItem: {
        name: null,
        settings: {
          weight: true,
          factory: true,
          date: true,
          line: true,
          shift: true,
          group: true,
        },
        factories: [],
        users: [],
        printers: []
      },
      defaultItem: {
        name: null,
        settings: {
          weight: true,
          factory: true,
          date: true,
          line: true,
          shift: true,
          group: true,
        },
        factories: [],
        users: [],
        printers: []
      }
    };
  },
  mounted() {
    // if (this.clients.length === 0) this.fetch();
    this.fetch();
  },
  computed: { ...mapState('clients', ['clients', 'fetching', 'selectedClient']) },
  methods: {
    ...mapActions('clients', ['fetch']),
    ...mapMutations(['setToDelete']),
    ...mapMutations('clients', ['setSelectedClient']),
    newItem() {
      this.openDialogWith(this.defaultItem);
    },
    editItem(item) {
      this.openDialogWith(item);
    },
    deleteItem(item) {
      const toDelete = {
        items: [item],
        module: 'clients'
      };
      this.setToDelete(toDelete);
    },
    handleSearch(val) { this.search = val; },
    openDialogWith(item) {
      this.$eventHub.$emit('openFormDialog', {
        form: 'client',
        editedItem: Object.assign({}, item)
      });
    }
  }
};
</script>
