<template>
  <BaseCard>
    <BaseFormTitle>
      {{ isEditMode ? `Editar Etiqueta: ${editedItem.sku}` : 'Nueva Etiqueta'}}
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
          label="SKU"
          v-model="editedItem.sku"
          data-vv-name="sku"
          v-validate="'required'"
          :error-messages="errors.collect('sku')"
        />

        <VTextField
          label="Etiqueta"
          :value="labelName"
          data-vv-name="label"
          v-validate="'required'"
          append-icon="attach_file"
          clearable
          hint="Toca para seleccionar archivo"
          persistent-hint
          @click="pickFile('label')"
          @click:clear="clearFile('label')"
          readonly
          :error-messages="errors.collect('label')"
        />
        <input
          id="label"
          ref="label"
          style="display: none"
          type="file"
          accept=".prn"
          @change="onFilePicked">

        <VTextField
          label="Autorización"
          :value="authName"
          data-vv-name="auth"
          v-validate="''"
          append-icon="attach_file"
          hint="Toca para seleccionar archivo"
          persistent-hint
          @click="pickFile('auth')"
          @click:clear="clearFile('auth')"
          clearable
          readonly
          :error-messages="errors.collect('auth')"
        />

        <input
          id="auth"
          ref="auth"
          style="display: none"
          type="file"
          accept=".pdf,image/*"
          @change="onFilePicked">

          <template v-if="labelConfigFields.length > 0">
            <VTextField
              v-model="field.value"
              class="mt-2"
              v-for="field in labelConfigFields"
              :key="field.name"
              :ref="field.name"
              :label="field.label"
              :type="field.type"
              :data-vv-name="field.name"
              v-validate="'required'"
              :error-messages="errors.collect(`${field.name}`)"
            />
          </template>

          <VExpandTransition v-if="auth || label">
            <div class="mt-4" v-if="loading">
              <VLayout row justify-space-between>
                <span>{{ uploadProgress === 100 ? 'Creando pdf & png' : 'Subiendo archivos'}}</span>
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
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  $_veeValidate: { validator: 'new' },
  data() {
    return {
      label: null,
      auth: null,
    };
  },
  props: ['editedItem'],
  computed: {
    ...mapGetters('clients', ['clients']),
    ...mapState('labels', ['loading', 'uploadProgress', 'fromClient']),
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
      if (this.editedItem.authorization) {
        return this.editedItem.authorization.name;
      }
      return null;
    },
    labelConfigFields() {
      if (!this.fromClient) return [];
      const currentClient = this.clients.find(client => client.id === this.fromClient);
      if (!currentClient.settings.customFields) {
        return [];
      }
      return currentClient.settings.customFields.map(field => ({
        ...field,
        value: this.editedItem.settings ? this.editedItem.settings[field.name] : null
      }));
    }
  },
  methods: {
    ...mapActions('labels', ['store', 'update']),
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
    clearFile(val) {
      this.$refs[val].value = '';
      this[val] = null;
      this.editedItem[val] = null;
    },
    validate() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.submit();
        }
      });
    },
    submit() {
      const settings = {};
      this.labelConfigFields.forEach(field => {
        const key = field.name;
        const value = field.value;
        settings[key] = value;
      });

      const data = {
        name: this.editedItem.name,
        sku: this.editedItem.sku,
        label: this.label,
        auth: this.auth,
        settings
      };

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
      this.$refs.label.value = '';
      this.$refs.auth.value = '';
      this.label = null;
      this.auth = null;
      this.$validator.reset();
    }
  }
};
</script>
