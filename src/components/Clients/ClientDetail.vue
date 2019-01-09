<template>
  <BaseCard>
    <VToolbar
      dark
      tabs
      color="secondary"
    >
      <VToolbarTitle>{{ selectedClient.name }}</VToolbarTitle>
      <VSpacer />
      <!-- <VIcon>refresh</VIcon> -->

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
            @click="openForm"
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
        class="mt-4"
        v-for="(item, i) in tabs"
        :value="`tab-${i}`"
        :key="i"
      >
        <VCardText>
          <FactoryTab v-if="item === 'Plantas'"/>
          <UsersTab v-else-if="item === 'Usuarios'"/>
          <!-- <PrintersTab v-else /> -->
        </VCardText>
      </VTabItem>
    </VTabsItems>
  </BaseCard>
</template>

<script>
import { mapState } from 'vuex';

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
  },
  computed: { ...mapState('clients', ['selectedClient']) },
  methods: {
    openForm() {
      const form = this.model === 'tab-0' ? 'factory' : 'user';
      this.$eventHub.$emit('openFormDialog', { form });
    }
  }
};
</script>

<style>
.custom-tab {
  max-height: 70vh;
}
</style>
