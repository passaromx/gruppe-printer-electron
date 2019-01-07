<template>
  <BaseCard>
    <VToolbar
      dark
      tabs
      color="secondary"
    >
      <VToolbarTitle>Soluciones Passaro</VToolbarTitle>
      <VSpacer />
      <VIcon>refresh</VIcon>

      <div slot="extension">
        <VFabTransition>
          <VBtn
            v-show="model !== 'tab-2'"
            color="primary"
            dark
            small
            absolute
            bottom
            right
            fab
          >
            <VIcon>add</VIcon>
          </VBtn>
        </VFabTransition>

        <VTabs
          slot="extension"
          v-model="model"
          left
          color="secondary"
          slider-color="primary"
        >
          <VTab
            v-for="(item, i) in tabs"
            :key="i"
            :href="`#tab-${i}`"
          >
            {{ item }}
          </VTab>
        </VTabs>
      </div>
    </VToolbar>

    <VTabsItems v-model="model">
      <VTabItem
        v-for="(item, i) in tabs"
        :value="`tab-${i}`"
        :key="i"
      >
        <VCardText class="pt-5">
          <FactoryTab v-if="item === 'Plantas'"/>
          <UsersTab v-else-if="item === 'Usuarios'"/>
        </VCardText>
      </VTabItem>
    </VTabsItems>
  </BaseCard>
</template>

<script>
export default {
  components: {
    FactoryTab: () => import('@/components/Clients/FactoryTab'),
    UsersTab: () => import('@/components/Clients/UsersTab')
  },
  data() {
    return {
      tabs: ['Plantas', 'Usuarios', 'Impresoras'],
      model: 'tab-0',
    };
  }
};
</script>

<style>
.custom-tab {
  max-height: 70vh;
}
</style>
