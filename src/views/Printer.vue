<template>
  <div>
    <VDialog
      v-model="dialog"
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
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import { ipcRenderer } from 'electron';

export default {
  components: {
    FormTile,
    PreviewTile
  },
  data: () => ({ dialog: false }),
  mounted() {
    console.log('printer mounted');
    this.$eventHub.$emit('closeDrawer');

    if (this.user && this.user.client) this.sync();

    this.$eventHub.$on('sync', () => this.sync(true));

    ipcRenderer.on('synced', (e, data) => {
      console.log('synced', data);
      this.setLabels(data.labels);
      this.setConfig(data.config);
      setTimeout(() => { this.dialog = false; }, 300);
    });

    ipcRenderer.on('errorSync', (e, error) => {
      console.log('errorsync');
      setTimeout(() => { this.dialog = false; }, 300);
      this.sendError({
        error,
        type: 'warning'
      });
    });
  },
  watch: {
    isLoggedIn() {
      this.sync();
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('printer', ['isSyncing']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapMutations('printer', ['setIsSyncing', 'setLabels', 'setConfig']),
    ...mapActions(['sendError']),
    sync(fromNavigation) {
      this.dialog = true;
      console.log('syncing');
      ipcRenderer.send('sync', this.user.client, fromNavigation);
    }
  },
  destroyed() {
    this.$eventHub.off('sync');
    ipcRenderer.removeAllListeners();
  }
};
</script>
