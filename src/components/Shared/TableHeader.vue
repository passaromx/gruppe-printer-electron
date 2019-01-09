<template>
  <div>
    <VExpandTransition>
      <div v-if="selected.length > 0" class="delete-bar">
        <VContainer fluid class="py-0" style="height: 100%">
          <VLayout
            fill-height
            row
            justify-space-between
            align-center
          >
            <span>
              {{ selected.length }} registro{{ selected.length > 1 ? 's' : '' }}
              selecionado{{ selected.length > 1 ? 's' : '' }}
            </span>
            <VBtn
              class="mx-0"
              flat
              color="red"
              @click="deleteItems"
            >
              <VIcon class="mr-2">delete</VIcon>
              Borrar
            </VBtn>
          </VLayout>
        </VContainer>

      </div>
    </VExpandTransition>
    <VCardTitle>
      <VLayout row wrap>
        <VFlex xs12 v-bind:class="[ condensed ? 'sm3' : 'sm6']">
          <VTextField
            class="pt-0"
            v-model="search"
            placeholder="Buscar..."
            append-icon="search"
            hide-details
            clearable
          />
        </VFlex>
        <VFlex xs12 v-bind:class="[ condensed ? 'sm9' : 'sm6']" v-if="!hideActions">
          <VLayout row justify-end>
            <VBtn
              v-if="filters"
              class="mx-0"
              flat
              color="secondary"
              @click="$emit('newItem')"
            >
              <VIcon class="mr-2">filter_list</VIcon>
              Filtros
            </VBtn>
            <VBtn
              class="mx-0"
              flat
              color="secondary"
              @click="$emit('newItem')"
            >
              <VIcon class="mr-2">add</VIcon>
              Crear
            </VBtn>
          </VLayout>
        </VFlex>
      </VLayout>
    </VCardTitle>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    filters: Array,
    condensed: {
      type: Boolean,
      default: false
    },
    module: String,
    hideActions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { search: '' };
  },
  methods: {
    ...mapMutations(['setToDelete']),
    deleteItems() {
      const toDelete = {
        items: this.selected,
        module: this.module
      };
      this.setToDelete(toDelete);
    }
  }
};
</script>

<style scoped>
.delete-bar {
  background-color: #e0e0e0;
  position: absolute;
  width: 100%;
  height: 65px;
  /* border-radius: 3px 3px 0 0; */
  z-index: 2;
}
</style>
