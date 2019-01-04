<template>
  <div>
    <BaseCard>
      <TableHeader :selected="selected"/>

      <VDataTable
        v-model="selected"
        :headers="headers"
        :items="desserts"
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
          <td class="justify-center layout px-0">
            <VIcon
              small
              class="mr-2"
            >
              edit
            </VIcon>
            <VIcon
              small
              @click="deleteItem(props.item)"
            >
              settings
            </VIcon>
          </td>
        </template>
      </VDataTable>
    </BaseCard>
  </div>

</template>

<script>
export default {
  components: { TableHeader: () => import('@/components/Shared/TableHeader') },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Acciones',
          align: 'center',
          value: 'calories'
        }
      ],
      desserts: [
        {
          name: 'Soluciones Passaro',
          factories: [],
          users: []
        }
      ]
    };
  }
};
</script>
