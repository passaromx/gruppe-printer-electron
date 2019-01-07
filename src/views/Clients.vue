<template>
  <VContainer grid-list-lg>
    <!-- <BaseHeader label="Clientes" @refresh="selected = []"/> -->
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
    ClientList: () => import('@/components/Clients/ClientList'),
    ClientDetail: () => import('@/components/Clients/ClientDetail')
  },
  data() {
    return { selected: [] };
  }
};
</script>
