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
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  components: {
    FormTile,
    PreviewTile
  },
  mounted() {
    this.$eventHub.$emit('closeDrawer');

    ipcRenderer.on('synced', (e, data) => {
      this.setIsSyncing(false);
      this.setLabels(data);
    });
  },
  watch: {
    isReady(val) {
      if (val && this.isLoggedIn) {
        ipcRenderer.send('sync', this.user.client._id);
        this.setIsSyncing(true);
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('printer', ['isSyncing']),
    ...mapState('auth', ['user']),
    ...mapState(['isReady'])
  },
  methods: { ...mapMutations('printer', ['setIsSyncing', 'setLabels']), }
};
</script>
