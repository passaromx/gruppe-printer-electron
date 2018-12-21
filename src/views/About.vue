<template>
  <VContainer grid-list-lg>
    <VLayout row wrap>
      <VFlex xs12 sm6>
        <FormTile />
      </VFlex>
      <VFlex xs12 sm6>
        <PreviewTile />
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
import FormTile from '@/components/Printer/FormTile';
import PreviewTile from '@/components/Printer/PreviewTile';

export default {
  components: {
    FormTile,
    PreviewTile
  }
};
</script>
