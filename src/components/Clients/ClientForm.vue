<template>
  <BaseCard>
    <VCardTitle class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <VAvatar
        color="secondary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></VAvatar>
    </VCardTitle>

    <VWindow v-model="step">
      <VWindowItem :value="1">
        <VCardText>
          <VForm @keyup.native.enter="validate">
            <VTextField
              label="Nombre"
              v-model="editedItem.name"
              data-vv-name="name"
              v-validate="'required'"
              :error-messages="errors.collect('name')"
              required/>
            <span class="caption grey--text text--darken-1">
              Este nombre se usará para identificar etiquetas, plantas y usuarios
            </span>
          </VForm>
        </VCardText>
      </VWindowItem>

      <!-- <VWindowItem :value="2">
        <VCardText>
          <span class="caption grey--text text--darken-1">
            Selecciona los campos de impresión a mostrar
          </span>
          <VContainer class="pa-0" grid-list-lg>
            <VLayout row wrap>
              <VFlex xs6>
                <VCheckbox
                  v-model="editedItem.settings.weight"
                  label="Peso neto"
                  hide-details />
                <VCheckbox
                  v-model="editedItem.settings.factory"
                  label="Planta"
                  hide-details />
                <VCheckbox
                  v-model="editedItem.settings.date"
                  label="Fecha de impresión"
                  hide-details />
              </VFlex>
              <VFlex xs6>
                <VCheckbox
                  v-model="editedItem.settings.line"
                  label="Línea"
                  hide-details />
                <VCheckbox
                  v-model="editedItem.settings.shift"
                  label="Turno"
                  hide-details />
                <VCheckbox
                  v-model="editedItem.settings.group"
                  label="Grupo"
                  hide-details />
              </VFlex>
            </VLayout>
          </VContainer>
        </VCardText>
      </VWindowItem> -->
    </VWindow>

    <VDivider></VDivider>

    <VCardActions>
      <!-- <VBtn
        :disabled="step === 1 || loading"
        flat
        @click="step--"
      >
        Atras
      </VBtn> -->
      <VSpacer />
      <VBtn
        :disabled="loading"
        :loading="loading"
        color="primary"
        depressed
        @click="validate"
      >
        {{ buttonText }}
      </VBtn>
    </VCardActions>
  </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  $_veeValidate: { validator: 'new' },
  props: ['editedItem'],
  data: () => ({ step: 1 }),
  computed: {
    ...mapState('clients', ['loading']),
    currentTitle() {
      switch (this.step) {
        case 1: return 'Datos de cliente';
        default: return 'Ajustes de impresión';
      }
    },
    isEditMode() {
      return this.editedItem ? !!this.editedItem._id : false;
    },
    buttonText() {
      if (this.step === 1) {
        const text = this.isEditMode ? 'Actualizar' : 'Crear';
        return text;
      }
      return 'Siguiente';
    }
  },
  methods: {
    ...mapActions('clients', ['store', 'update']),
    validate() {
      if (this.step === 1) {
        this.$validator.validate().then(res => {
          // if (res) this.step++;
          if (res) this.submit();
        });
      } else {
        this.submit();
      }
    },
    submit() {
      const client = {
        name: this.editedItem.name,
        settings: this.editedItem.settings
      };
      if (this.isEditMode) {
        client._id = this.editedItem._id;
        this.update(client)
          .then(() => {
            this.$eventHub.$emit('closeFormDialog');
          });
      } else {
        this.store(client)
          .then(() => {
            this.$eventHub.$emit('closeFormDialog');
          });
      }
    }
  }
};
</script>
