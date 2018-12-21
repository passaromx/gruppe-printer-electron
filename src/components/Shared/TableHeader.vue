<template>
  <VCardTitle>
    <VLayout row wrap>
      <VFlex xs12 sm4>
        <VTextField
          v-model="search"
          placeholder="Buscar..."
        />
      </VFlex>
      <VFlex xs12 sm8>
        <VLayout row justify-end>
          <VScrollYTransition>
            <VBtn
              v-if="selected.length > 0"
              class="white--text"
              outline
              color="red"
              @click="$emit('deleteItems')"
            >
              Borrar
            </VBtn>
          </VScrollYTransition>
          <VBtn
            outline
            color="success"
            @click="$emit('newItem')"
          >
            Crear
          </VBtn>
        </VLayout>
      </VFlex>
    </VLayout>
  </VCardTitle>
</template>

<script>
export default {
  props: ['selected'],
  data() {
    return { search: '' };
  }
};
</script>
