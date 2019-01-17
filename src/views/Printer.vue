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
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import { ipcRenderer } from 'electron';

export default {
  components: {
    FormTile,
    PreviewTile
  },
  data: () => ({ dialog: true }),
  mounted() {
    this.$eventHub.$emit('closeDrawer');
    if (this.user && this.user.client) ipcRenderer.send('sync', this.user.client);
    ipcRenderer.on('synced', (e, data) => {
      this.setLabels(data.labels);
      this.setConfig(data.config);
      this.setIsSyncing(false);
      this.dialog = false;
    });

    ipcRenderer.on('errorSync', (e, error) => {
      this.setIsSyncing(false);
      this.dialog = false;
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
        if (this.user.client) ipcRenderer.send('sync', this.user.client);
      }
    },
    isSyncing(val) {
      console.log('isisyncing new val', val);
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
