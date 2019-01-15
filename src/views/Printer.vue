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
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
import FormTile from '@/components/Printer/FormTile';
import PreviewTile from '@/components/Printer/PreviewTile';
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
    FormTile,
    PreviewTile
  },
  mounted() {
    this.$eventHub.$emit('closeDrawer');
    ipcRenderer.send('sync');
    this.setIsSyncing(true);
    ipcRenderer.on('synced', (e, data) => {
      console.log('synced', data);
      this.setIsSyncing(true);
      this.setLabels(data);
    });
  },
  computed: { ...mapState('printer', ['isSyncing']) },
  methods: { ...mapMutations('printer', ['setIsSyncing', 'setLabels']), }
};
</script>
