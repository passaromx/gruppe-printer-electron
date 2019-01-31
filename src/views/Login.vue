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
        <VForm class="mx-5 mt-5" @keyup.native.enter="validate">
          <VTextField
            label="Correo o usuario"
            v-model="email"
            append-icon="alternate_email"
            data-vv-name="email"
            v-validate="'required'"
            :error-messages="errors.collect('email')"
          />
          <VTextField
            label="Contraseña"
            v-model="password"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            data-vv-name="password"
            v-validate="'required'"
            :error-messages="errors.collect('password')"
          />
          <VLayout justify-end>
            <VBtn
              color="primary"
              class="mt-3"
              :disabled="isLoading"
              :loading="isLoading"
              @click="validate"
            >
              Iniciar Sesión
            </VBtn>
          </VLayout>
        </VForm>
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
/* eslint-disable import/no-extraneous-dependencies */
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';

export default {
  $_veeValidate: { validator: 'new' },

  data() {
    return {
      show: false,
      email: null,
      password: null
    };
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapGetters('auth', ['isAdmin'])
  },
  methods: {
    ...mapActions('auth', ['signInUser']),
    ...mapMutations([
      'setIsLoading',
      'setSnackbar'
    ]),
    validate() {
      this.$validator.validate().then(res => {
        if (res) this.submit();
      });
    },
    submit() {
      // console.log('submitting', this.email);
      this.setIsLoading(true);
      this.signInUser({
        identifier: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push({ name: this.isAdmin ? 'Labels' : 'Printer' });
        })
        .catch(() => {
        })
        .finally(() => {
          this.setIsLoading(false);
        });
    }
  }
};
</script>
