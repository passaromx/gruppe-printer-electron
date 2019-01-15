<template>
  <BaseCard>
    <BaseFormTitle>
      {{ isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'}}
    </BaseFormTitle>
    <VCardText>

        <VLayout column>
          <VFlex xs12>
            <VTextField
              label="Correo o usuario"
              v-model="editedItem.email"
              data-vv-name="email"
              v-validate="'required'"
              :error-messages="errors.collect('email')"/>
          </VFlex>
          <VFlex xs12>
            <VTextField
              type="password"
              label="Contraseña"
              v-model="editedItem.password"
              data-vv-name="password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"/>
          </VFlex>
        </VLayout>

    </VCardText>
    <VCardActions>
      <VSpacer></VSpacer>
      <VBtn
        flat
        :disabled="loading"
        @click="$eventHub.$emit('closeFormDialog');"
      >
        Cancelar
      </VBtn>
      <VBtn
        flat
        color="success"
        @click="validate"
        :loading="loading"
        :disabled="loading"
      >
        Guardar
      </VBtn>
    </VCardActions>
  </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['editedItem'],
  $_veeValidate: { validator: 'new' },
  watch: {
    editedItem() {
      this.$validator.reset();
    }
  },
  computed: {
    isEditMode() {
      return !!this.editedItem._id;
    },
    ...mapState('clients', ['selectedClient', 'loading'])
  },
  methods: {
    ...mapActions('clients', ['storeUser', 'updateUser']),
    validate() {
      this.$validator.validate().then(res => {
        if (res) {
          this.submit();
        }
      });
    },
    submit() {
      this.editedItem.client = this.selectedClient._id;
      if (!this.isEditMode) {
        // admin role
        // this.editedItem.role = '5c2f94bdf80d6665bf53b9d8';
        // client role
        this.editedItem.role = '5c2f94bdf80d6665bf53b9d9';
        console.log(this.editedItem);
        this.storeUser(this.editedItem)
          .then(() => {
            this.$eventHub.$emit('closeFormDialog');
          });
      } else {
        this.updateUser(this.editedItem)
          .then(() => {
            this.$eventHub.$emit('closeFormDialog');
          });
      }
    }
  }
};
</script>
