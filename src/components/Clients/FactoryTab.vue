<template>
  <div>
    <div v-if="factories.length === 0">
      <NoRecords />
    </div>
    <div v-else>
      <VLayout class="px-3" row justify-space-between>
        <VFlex xs6>
          <VTextField
            class="pt-0"
            v-model="search"
            placeholder="Buscar..."
            append-icon="search"
            hide-details
            clearable />
        </VFlex>
        <VFlex xs4 class="text-xs-right">
          <span class="grey--text" style="vertical-align: middle;">{{ filteredItems.length }} registros</span>
        </VFlex>
      </VLayout>
      <VuePerfectScrollbar :settings="scrollSettings">
        <VList style="max-height: 500px">
          <VListTile
            v-for="(item, i) in filteredItems"
            :key="i"
            avatar
          >
            <!-- <VListTileAvatar>
              <VIcon :class="[item.iconClass]">{{ item.icon }}</VIcon>
            </VListTileAvatar> -->

            <VListTileContent>
              <VListTileTitle>{{ item.name }}</VListTileTitle>
              <!-- <VListTileSubTitle>{{ item.subtitle }}</VListTileSubTitle> -->
            </VListTileContent>

            <VListTileAction>
              <VBtn icon ripple>
                <VIcon color="grey lighten-1">more_vert</VIcon>
              </VBtn>
            </VListTileAction>
          </VListTile>
        </VList>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    NoRecords: () => import('@/components/Clients/NoRecords'),
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar')
  },
  data() {
    return {
      search: '',
      scrollSettings: { maxScrollbarLength: 160 },
      items: [
        {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          name: 'Tlaxcala',
          subtitle: '65,000 impresiones'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('clients', ['factories']),
    filteredItems() {
      if (this.search) {
        // const regexp = new RegExp(`${this.search}`, 'g');
        return this.factories.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      }
      return this.factories;
    }
  }
};
</script>
