<template>
  <VLayout row wrap>
    <VFlex xs12 sm4 lg3>
      <FormTile />
    </VFlex>
    <VFlex xs12 sm8 lg9>
      <PreviewTile />
    </VFlex>
  </VLayout>
</template>

<script>
import FormTile from '@/components/Printer/FormTile';
import PreviewTile from '@/components/Printer/PreviewTile';

export default {
  components: {
    FormTile,
    PreviewTile
  },
  mounted() {
    this.$eventHub.$emit('closeDrawer');
  }
};
</script>
