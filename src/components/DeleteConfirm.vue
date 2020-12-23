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
        case 'authorizations':
          return `¿Deseas eliminar ${this.toDelete.items.length} autorizaciones?`;
        case 'clients':
          return `¿Deseas eliminar el cliente "${this.toDelete.items[0].name}" con sus etiquetas, usuarios y plantas?`;
        case 'clients/factories':
          return `¿Deseas eliminar la planta "${this.toDelete.items[0].name}" con sus usuarios asignados?`;
        case 'clients/users':
          return `¿Deseas eliminar el usuario "${this.toDelete.items[0].email}"?`;
        default:
          return 'default msg';
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', e => {
      if (e.key === 'Enter' && this.deleteConfirmDialog && this.toDelete) {
        this.confirmDelete();
      }
    });
  },
  methods: {
    ...mapMutations(['setToDelete']),
    confirmDelete() {
      this.loading = true;
      const method = this.toDelete.method ? this.toDelete.method : 'delete';
      const storeModule = this.toDelete.module.includes('/')
        ? this.toDelete.module.split('/')[0]
        : this.toDelete.module;
      this.$store.dispatch(`${storeModule}/${method}`, this.toDelete.items.map(item => item._id))
        .then(() => {
          this.close();
          this.$eventHub.$emit('clear-selected');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.setToDelete(null);
    }
  }
};
</script>
