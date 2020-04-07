<template>
  <div>
    <TabSearch
      :items="items"
      :filter="settings.filter"
      @searchResults="filteredItems = $event"
      v-if="items.length !== 0"/>

    <NoRecords v-if="items.length === 0" :from="settings.form"/>

    <VuePerfectScrollbar v-else :settings="scrollSettings">
      <VList :two-line="lines === 2" :three-line="lines === 3" style="max-height: 500px">
        <VListTile
          v-for="(item, i) in filteredItems"
          :key="i"
          avatar
        >
          <slot v-bind:item="item"/>

          <VListTileAction v-if="actions">
            <VMenu bottom left>
              <VBtn
                flat
                color="grey"
                slot="activator"
                icon
              >
                <VIcon>more_vert</VIcon>
              </VBtn>

              <VList>
                <!-- <VListTile @click="showDetail(item)">
                  <VListTileTitle><VIcon small class="mr-3">file_copy</VIcon>Ver detalle</VListTileTitle>
                </VListTile> -->
                <VListTile @click="editItem(item)">
                  <VListTileTitle><VIcon small class="mr-3">edit</VIcon>Editar</VListTileTitle>
                </VListTile>
                <VListTile @click="deleteItem(item)">
                  <VListTileTitle><VIcon small class="mr-3">delete</VIcon>Borrar</VListTileTitle>
                </VListTile>
              </VList>
            </VMenu>
            <!-- <VBtn icon ripple>
              <VIcon color="grey lighten-1">more_vert</VIcon>
            </VBtn> -->
          </VListTileAction>
        </VListTile>
      </VList>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    settings: Object,
    actions: {
      type: Boolean,
      default: true
    },
    lines: {
      type: Number,
      default: 1
    }
  },
  components: {
    NoRecords: () => import('@/components/Clients/NoRecords'),
    TabSearch: () => import('@/components/Clients/TabSearch'),
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar')
  },
  data() {
    return {
      filteredItems: [],
      scrollSettings: { maxScrollbarLength: 160 },
    };
  },
  watch: {
    items(val) {
      this.filteredItems = val;
    }
  },
  methods: {
    ...mapMutations(['setToDelete']),
    editItem(item) {
      this.$eventHub.$emit('openFormDialog', {
        form: this.settings.form,
        editedItem: Object.assign({}, item)
      });
    },
    deleteItem(item) {
      const toDelete = {
        items: [item],
        module: this.settings.module,
        method: this.settings.deleteMethod
      };
      this.setToDelete(toDelete);
    }
  }
};
</script>
