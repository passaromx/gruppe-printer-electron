<template>
  <VLayout row>
    <VFlex xs6>
      <VContainer>
        <VLayout
          column
          align-center
        >
          <VImg
            class="mt-5"
            :src="require('../assets/gruppe_full.png')"
            contain
            height="150"
            width="60%" />
        </VLayout>
        <form @submit="validate" class="mx-5 mt-5">
          <VTextField
            label="Correo"
            v-model="email"
            append-icon="alternate_email"
          />
          <VTextField
            label="Contraseña"
            v-model="password"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          />
          <VLayout justify-end>
            <VBtn type="submit" class="mt-3">Iniciar Sesión</VBtn>
          </VLayout>
        </form>
      </VContainer>

    </VFlex>
    <VFlex xs6>
      <BaseCard isFullHeight="true" color="primary">
        <!-- <VImg style="height: 100vh" :src="require('../assets/industry.jpg')"/> -->
      </BaseCard>
    </VFlex>
  </VLayout>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      email: null,
      password: null
    };
  },
  methods: {
    validate() {
      console.log('validating');
    }
  }
};
</script>
