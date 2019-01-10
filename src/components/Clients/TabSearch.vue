<template>
  <VLayout
    class="px-3"
    row
    wrap
    justify-space-between
  >
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
      <span class="grey--text" style="vertical-align: middle;">{{ items.length }} registros</span>
    </VFlex>
    <VFlex xs12 class="mt-3" v-if="filteredItems.length === 0">
      <span class="subheading">No encontramos resultados para la búsqueda</span>
    </VFlex>
  </VLayout>

</template>

<script>
export default {
  props: ['items'],
  data: () => ({
    search: '',
    filteredItems: []
  }),
  watch: {
    search(val) {
      if (val) {
        this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
      } else {
        this.filteredItems = this.items;
      }

      this.$emit('searchResults', this.filteredItems);
    }
  },
  mounted() {
    this.filteredItems = this.items;
    this.$emit('searchResults', this.filteredItems);
  }
};
</script>
