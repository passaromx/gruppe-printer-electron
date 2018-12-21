<template>
  <BaseCard>
    <VCardTitle>Form Tile</VCardTitle>
    <VDivider />
    <VCardText>
      <VContainer class="pa-0" grid-list-lg>
        <VLayout row wrap>
          <VFlex xs12>
            <VTextField
              outline
              v-model="test"
              label="test input" />
          </VFlex>
        </VLayout>
      </VContainer>
    </VCardText>
  </BaseCard>
</template>

<script>
export default {
  data() {
    return { test: '' };
  }
};
</script>
