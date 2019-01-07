<template>
  <VContainer grid-list-lg>
    <!-- <BaseHeader label="Clientes" @refresh="selected = []"/> -->
    <FormModal />
    <VLayout row fill-height>
      <VFlex xs6>
        <ClientList />
      </VFlex>
      <VFlex xs6>
        <ClientDetail />
      </VFlex>
    </VLayout>

  </VContainer>
</template>

<script>
export default {
  components: {
    FormModal: () => import('@/components/Clients/FormModal'),
    ClientList: () => import('@/components/Clients/ClientList'),
    ClientDetail: () => import('@/components/Clients/ClientDetail')
  },
  data() {
    return { selected: [] };
  }
};
</script>
