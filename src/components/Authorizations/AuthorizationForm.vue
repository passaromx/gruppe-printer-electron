<template>
  <BaseCard>
    <BaseFormTitle>
      {{ isEditMode ? `Editar Autorización` : 'Nueva Autorización' }}
    </BaseFormTitle>
    <VCardText>
      <VForm @keyup.native.enter="validate">
        <VTextField
          label="Nombre"
          v-model="editedItem.name"
          data-vv-name="name"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
        />

        <VTextField
          label="Autorización"
          :value="authName"
          data-vv-name="auth"
          v-validate="''"
          append-icon="attach_file"
          hint="Toca para seleccionar archivo"
          persistent-hint
          @click="pickFile('auth')"
          @click:clear="clearFile"
          clearable
          readonly
          :error-messages="errors.collect('auth')"
        />

        <input
          id="auth"
          ref="auth"
          style="display: none"
          type="file"
          accept=".pdf"
          @change="onFilePicked">

          <VExpandTransition v-if="auth">
            <div class="mt-4" v-if="loading">
              <VLayout row justify-space-between>
                <span>Subiendo archivo</span>
                <span>{{ uploadProgress }} %</span>
              </VLayout>
              <VProgressLinear
                v-model="uploadProgress"
                :indeterminate="uploadProgress === 100"/>
            </div>
          </VExpandTransition>

        </VForm>
    </VCardText>

    <VCardActions>
      <VSpacer />
      <VBtn
        flat
        @click="close"
        :disabled="loading"
      >
        Cancelar
      </VBtn>
      <VBtn
        flat
        color="success"
        @click="validate"
        :disabled="loading || errors.any()"
        :loading="loading"
      >
        Guardar
      </VBtn>
    </VCardActions>
  </BaseCard>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  $_veeValidate: { validator: 'new' },
  data() {
    return { auth: null };
  },
  props: ['editedItem'],
  computed: {
    ...mapState('authorizations', ['loading', 'uploadProgress', 'fromClient']),
    isEditMode() {
      return !!this.editedItem._id;
    },
    labelName() {
      if (this.label) {
        return this.label.name;
      }
      if (this.editedItem.label) {
        return this.editedItem.label.name;
      }
      return null;
    },
    authName() {
      if (this.auth) {
        return this.auth.name;
      }
      if (this.editedItem.authPdf) {
        return this.editedItem.authPdf.name;
      }
      return null;
    },
  },
  methods: {
    ...mapActions('authorizations', ['store', 'update']),
    pickFile(input) {
      this.$refs[input].click();
    },
    onFilePicked(e) {
      const { id } = e.target;
      const files = e.target.files || e.dataTransfer.files;
      // console.log('files', files);

      if (files[0] !== undefined) {
        const filename = files[0].name;

        if (filename && filename.lastIndexOf('.') <= 0) {
          return;
        }

        if (id === 'label') {
          [this.label] = files;
        } else {
          [this.auth] = files;
        }
        this.$validator.reset();
      }
    },
    clearFile() {
      this.$refs.auth.value = '';
      this.auth = null;
      this.editedItem.authPdf = null;
    },
    validate() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.submit();
        }
      });
    },
    submit() {
      const data = {
        name: this.editedItem.name,
        client: this.fromClient,
        authPdf: this.auth,
      };

      // console.log(data);

      if (this.isEditMode) {
        data.id = this.editedItem._id;
        this.update(data).then(() => { this.close(); });
      } else {
        data.client = this.fromClient;
        this.store(data).then(() => { this.close(); });
      }
    },
    close() {
      this.$emit('closeDialog');
      this.$refs.auth.value = '';
      this.auth = null;
      this.$validator.reset();
    }
  }
};
</script>
