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
import FormTile from '@/components/Printer/FormTile';
import PreviewTile from '@/components/Printer/PreviewTile';
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import { ipcRenderer } from 'electron';

export default {
  components: {
    FormTile,
    PreviewTile
  },
  // data: () => ({ dialog: true }),
  mounted() {
    console.log('printr mounted');
    this.$eventHub.$emit('closeDrawer');
    ipcRenderer.on('synced', (e, data) => {
      console.log('synced', data);

      this.setLabels(data.labels);
      this.setConfig(data.config);
      setTimeout(() => this.setIsSyncing(false), 1000);
    });

    ipcRenderer.on('errorSync', (e, error) => {
      console.log('errorsync');
      // this.setIsSyncing(false);
      setTimeout(() => this.setIsSyncing(false), 1000);
      this.sendError({
        error,
        type: 'warning'
      });
    });
  },
  watch: {
    isReady(val) {
      if (val && this.isLoggedIn) {
        this.setIsSyncing(true);
        if (this.user.client) ipcRenderer.send('sync', this.user.client._id);
        this.$router.push({ name: 'Printer' });
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('printer', ['isSyncing']),
    ...mapState('auth', ['user']),
    ...mapState(['isReady'])
  },
  methods: {
    ...mapMutations('printer', ['setIsSyncing', 'setLabels', 'setConfig']),
    ...mapActions(['sendError'])
  }
};
</script>
