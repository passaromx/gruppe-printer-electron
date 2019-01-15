<template>
  <div>
    <VDialog
      v-model="isSyncing"
      persistent
      width="300"
    >
      <VCard
        color="primary"
        dark
      >
        <VCardText>
          Sincronizando, espera por favor...
          <VProgressLinear
            indeterminate
            color="white"
            class="mb-0"
          ></VProgressLinear>
        </VCardText>
      </VCard>
    </VDialog>
    <VLayout row wrap>
      <VFlex xs12 sm4>
        <FormTile />
      </VFlex>
      <VFlex xs12 sm8>
        <PreviewTile />
      </VFlex>
    </VLayout>
  </div>

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
  // data: () => ({ dialog: true }),
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
        console.log('syncing');
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
