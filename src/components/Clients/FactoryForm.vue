<template>
  <BaseCard>
    <BaseFormTitle>
      {{ isEditMode ? `Editar Planta: ${editedItem.name}` : 'Nueva Planta'}}
    </BaseFormTitle>
    <VCardText>
      <VForm @keyup.native.enter="validate">
        <VContainer class="pa-0" grid-list-lg>
          <VLayout row wrap>
            <VFlex xs8>
              <VTextField
                label="Nombre"
                v-model="editedItem.name"
                data-vv-name="name"
                v-validate="'required'"
                :error-messages="errors.collect('name')"/>
            </VFlex>
            <VFlex xs4>
              <VTextField
                label="Código"
                v-model="editedItem.code"
                data-vv-name="code"
                v-validate="'required'"
                :error-messages="errors.collect('code')"/>
            </VFlex>
            <VFlex xs12>
              <VTextField
                label="Nombre de contacto"
                v-model="editedItem.contactName"
                append-icon="person"
                data-vv-name="contactName"
                v-validate="'required'"
                :error-messages="errors.collect('contactName')"/>
            </VFlex>
            <VFlex xs12>
              <VTextField
                label="Correo"
                v-model="editedItem.email"
                append-icon="mail"
                data-vv-name="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"/>
            </VFlex>
            <VFlex xs12>
              <VTextField
                type="number"
                label="Teléfono"
                v-model="editedItem.phone"
                append-icon="phone"
                data-vv-name="phone"
                v-validate="'required'"
                :error-messages="errors.collect('phone')"/>
            </VFlex>
          </VLayout>
        </VContainer>
      </VForm>

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
      >Guardar</VBtn>
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
    // isEditMode: () => !!this.editedItem._id,
    isEditMode() {
      return !!this.editedItem._id;
    },
    ...mapState('clients', ['selectedClient', 'loading'])
  },
  methods: {
    ...mapActions('clients', ['storeFactory', 'updateFactory']),
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
        this.storeFactory(this.editedItem)
          .then(() => {
            this.$eventHub.$emit('closeFormDialog');
          });
      } else {
        this.updateFactory(this.editedItem)
          .then(() => {
            this.$eventHub.$emit('closeFormDialog');
          });
      }
    }
  }
};
</script>
