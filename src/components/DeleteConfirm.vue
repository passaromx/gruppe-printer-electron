<template>
  <VDialog v-model="deleteConfirmDialog" max-width="450px" persistent>
    <VCard>
      <VCardTitle class="headline red lighten-1 px-4 white--text" primary-title>
        ¡Aviso!
      </VCardTitle>
      <VCardText>
        <VContainer>
          <p v-if="toDelete" style="font-size: 18px">{{ message }}</p>
          <p>Esta acción es permanente y no puede ser deshecha</p>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
          flat
          @click.native="close"
          :disabled="loading">Cerrar</VBtn>
        <VBtn
          color="red darken-1"
          flat
          @click.native="confirmDelete"
          :disabled="loading"
          :loading="loading">Eliminar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState(['toDelete']),
    ...mapGetters(['deleteConfirmDialog']),
    message() {
      switch (this.toDelete.module) {
        case 'labels':
          return `¿Deseas eliminar ${this.toDelete.items.length} precintos?`;
        case 'clients':
          return `¿Deseas eliminar el cliente "${this.toDelete.items[0].name}" con sus etiquetas, usuarios y plantas?`;
        default:
          return 'default msg';
      }
    }
  },
  methods: {
    ...mapMutations(['setToDelete']),
    confirmDelete() {
      console.log('confirmed');
      this.loading = true;
      this.$store.dispatch(`${this.toDelete.module}/delete`, this.toDelete.items.map(item => item._id))
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.$eventHub.$emit('clear-selected');
          this.loading = false;
        });
    },
    close() {
      this.setToDelete(null);
    }
  }
};
</script>
