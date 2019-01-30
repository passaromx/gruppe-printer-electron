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
import { ipcRenderer } from 'electron';
import { handleError } from '@/utils';


export default {
  $_veeValidate: { validator: 'new' },

  data() {
    return {
      show: false,
      email: null,
      password: null
    };
  },
  mounted() {
    ipcRenderer.on('logged', (e, data) => {
      const { session, admin } = data;
      if (!admin) {
        const { user, jwt } = session;
        this.setUser(user);
        this.setSession({ jwt });
        if (localStorage) {
          localStorage.setItem('token', jwt);
          localStorage.setItem('USER', JSON.stringify(user));
        }
      }
      this.$router.push({ name: this.isAdmin ? 'Labels' : 'Printer' });
    });
    ipcRenderer.on('wrongCredentials', (e, err) => {
      const msg = handleError(err);
      this.setSnackbar({
        type: 'error',
        msg
      });
    });
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
    ...mapMutations('auth', [
      'setUser',
      'setSession'
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
        .then(data => {
          const { user, jwt } = data;
          ipcRenderer.send('login', this.email, this.password, user, jwt);
        })
        .catch(err => {
          const status = err.response ? err.response.status : 0;
          if (status !== 401 && status !== 403) {
            ipcRenderer.send('login', this.email, this.password, null, null, true);
          }
        })
        .finally(() => {
          this.setIsLoading(false);
        });
    }
  }
};
</script>
