<template>
  <div>
    <TableHeader :selected="selected" hideActions/>

    <VDataTable
      :items="desserts"
      class="elevation-0 mt-3 custom-table"
      hide-headers
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>
          <VLayout column align-left>
            <span class="email">{{ props.item.email }}</span>
            <span class="factory">Planta {{ props.item.factory }}</span>
          </VLayout>
        </td>
        <td class="text-xs-right">
          <VMenu bottom left>
            <VBtn
              slot="activator"
              flat
              color="grey lighten-1"
              icon
            >
              <VIcon>more_vert</VIcon>
            </VBtn>

            <VList>
              <!-- <VListTile @click="showDetail(props.item)">
                <VListTileTitle><VIcon small class="mr-3">file_copy</VIcon>Ver detalle</VListTileTitle>
              </VListTile> -->
              <VListTile @click="editItem(props.item)">
                <VListTileTitle><VIcon small class="mr-3">edit</VIcon>Editar</VListTileTitle>
              </VListTile>
              <VListTile @click="deleteItem(props.item)">
                <VListTileTitle><VIcon small class="mr-3">delete</VIcon>Borrar</VListTileTitle>
              </VListTile>
            </VList>
          </VMenu>
        </td>
      </template>
    </VDataTable>
  </div>
</template>

<script>
export default {
  components: { TableHeader: () => import('@/components/Shared/TableHeader') },
  data() {
    return {
      selected: [],
      desserts: [
        {
          value: false,
          email: 'test@test.com',
          factory: 'Tlaxcala',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Tlaxcala',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Tlaxcala',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Mérida',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Mérida',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Jalisco',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Monterrey',
          printings: 0
        },
        {
          value: false,
          email: 'test@test.com',
          factory: 'Monterrey',
          printings: 0
        }
      ]
    };
  }
};
</script>

<style scoped>
  .email {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
  }

  .factory {
    color: rgba(0,0,0,0.54);
    font-size: 14px;
  }

  .theme--light.v-table tbody tr:not(:last-child) {
    border-bottom: none;
}

  .custom-table .theme--light.v-table tbody tr:not(:last-child) {
    border: none;
  }
</style>
