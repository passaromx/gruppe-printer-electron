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
          <VTextField
            label="Email"
            value="john@vuetifyjs.com"
          ></VTextField>
          <span class="caption grey--text text--darken-1">
            This is the email you will use to login to your Vuetify account
          </span>
        </VCardText>
      </VWindowItem>

      <VWindowItem :value="2">
        <VCardText>
          <VTextField
            label="Password"
            type="password"
          ></VTextField>
          <VTextField
            label="Confirm Password"
            type="password"
          ></VTextField>
          <span class="caption grey--text text--darken-1">
            Selecciona los campos de impresión a mostrar
          </span>
        </VCardText>
      </VWindowItem>
    </VWindow>

    <VDivider></VDivider>

    <VCardActions>
      <VBtn
        :disabled="step === 1"
        flat
        @click="step--"
      >
        Atras
      </VBtn>
      <VSpacer></VSpacer>
      <VBtn
        :disabled="step === 3"
        color="primary"
        depressed
        @click="step++"
      >
        {{ step === 2 ? 'Crear' : 'Siguiente' }}
      </VBtn>
    </VCardActions>
  </BaseCard>
</template>

<script>
export default {
  data: () => ({ step: 1 }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1: return 'Datos de cliente';
        default: return 'Ajustes de impresión';
      }
    }
  }
};
</script>
