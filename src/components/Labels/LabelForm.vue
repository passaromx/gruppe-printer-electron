<template>
  <BaseCard>
    <BaseFormTitle>Nueva Etiqueta</BaseFormTitle>
    <VCardText>
      <!-- sku, name, label file, auth file, pdf & png -->
      <VTextField
        label="Nombre"
        v-model="editedItem.name"
        data-vv-name="name"
        v-validate="'required'"
        :error-messages="errors.collect('name')"/>
      <VTextField
        label="SKU"
        v-model="editedItem.sku"
        data-vv-name="sku"
        v-validate="'required'"
        :error-messages="errors.collect('sku')"/>

      <VTextField
        label="Seleccion de etiqueta"
        v-model="label.name"
        data-vv-name="label"
        v-validate="'required'"
        clearable
        @click="pickFile('label')"
        @click:clear="label = null"
        :error-messages="errors.collect('label')"
      />
      <input
        id="label"
        ref="label"
        style="display: none"
        type="file"
        accept="*"
        @change="onFilePicked">

      <VTextField
        label="Archivo de autorización"
        v-model="auth.name"
        data-vv-name="auth"
        v-validate="'required'"
        @click="pickFile('auth')"
        @click:clear="auth = null"
        clearable
        :error-messages="errors.collect('auth')"
      />
      <input
        id="auth"
        ref="auth"
        style="display: none"
        type="file"
        accept="*"
        @change="onFilePicked">

    </VCardText>

    <VCardActions>
      <VSpacer />
      <VBtn flat @click="close">Cancelar</VBtn>
      <VBtn
        flat
        color="success"
        @click="validate"
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
    return {
      label: { name: null },
      auth: { name: null },
    };
  },
  props: ['editedItem'],
  computed: { ...mapState('labels', ['loading']) },
  methods: {
    ...mapActions('labels', ['store']),
    pickFile(input) {
      console.log(input);
      this.$refs[input].click();
    },
    onFilePicked(e) {
      console.log(e);
      const { id } = e.target;
      const files = e.target.files || e.dataTransfer.files;

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
      }
    },
    validate() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.submit();
        }
      });
    },
    submit() {
      const data = {
        name: this.editedItem.name,
        sku: this.editedItem.sku,
        label: this.label,
        auth: this.auth
      };

      console.log(data);
      this.store(data);
    },
    close() {
      this.$emit('closeDialog');
      this.errors.clear();
    }
  }
};
</script>
