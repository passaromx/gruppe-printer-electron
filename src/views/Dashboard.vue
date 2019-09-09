<template>
  <VContainer grid-list-lg>
    <h5 class="display-1 mb-4">Estadísticos</h5>
    <VLayout row wrap>
      <VFlex xs4>
        <StatsCard title="Precintos" data="420"/>
      </VFlex>
      <VFlex xs4>
        <StatsCard title="Impresiones" data="345,000"/>
      </VFlex>
      <VFlex xs4>
        <StatsCard title="Licencias" data="8"/>
      </VFlex>
      <VFlex xs12>

      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
export default { components: { StatsCard: () => import('@/components/Dashboard/StatsCard') } };
</script>
