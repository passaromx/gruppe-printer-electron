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
  data: () => ({
    dialog: false,
    systemInfo: null
  }),
  mounted() {
    this.$eventHub.$emit('closeDrawer');
    // console.log('printer mounted');
    if (this.user && this.user.client) {
      // console.log('from mounted');
      this.sync();
      this.updateSystemInfo();
    }

    this.$eventHub.$on('sync', () => this.sync(true));

    ipcRenderer.on('synced', (e, data) => {
      // console.log('synced', data);
      this.setLabels(data.labels);
      this.setConfig(data.config);
      setTimeout(() => { this.dialog = false; }, 300);
      // this.dialog = false;
    });

    ipcRenderer.on('mac-checked', (e, checks) => {
      // console.log('mac-checked', checks);
      if (checks) {
        this.systemInfo.client = this.user.client._id;
        this.updateSysInfo(this.systemInfo);
      } else {
        ipcRenderer.send('get-system-info');
      }
    });

    ipcRenderer.on('system-info-fetched', (e, info) => {
      // console.log(info);
      if (localStorage) localStorage.setItem('systemInfo', JSON.stringify(info));
      info.client = this.user.client._id;
      this.updateSysInfo(info);
    });

    ipcRenderer.on('errorSync', (e, error) => {
      // console.log('errorsync', error);
      setTimeout(() => { this.dialog = false; }, 300);
      this.sendError({
        error,
        type: 'warning'
      });
    });
  },
  watch: {
    isLoggedIn(val) {
      if (val && !this.dialog) {
        // console.log('from watch');
        this.sync();
        this.updateSystemInfo();
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('printer', ['isSyncing']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapMutations('printer', ['setIsSyncing', 'setLabels', 'setConfig']),
    ...mapActions('printer', ['updateSysInfo']),
    ...mapActions(['sendError']),
    sync(fromNavigation) {
      this.dialog = true;
      // console.log('syncing');
      ipcRenderer.send('sync', this.user.client, fromNavigation);
    },
    updateSystemInfo() {
      this.systemInfo = JSON.parse(localStorage.getItem('systemInfo'));
      // console.log('checking sys info');
      if (this.systemInfo) {
        // console.log('checking mac');
        ipcRenderer.send('check-mac', this.systemInfo);
      } else {
        // console.log('fetching sys info');
        ipcRenderer.send('get-system-info');
      }
    }
  },
  beforeDestroy() {
    // console.log('before destroy', ipcRenderer);
    this.$eventHub.$off('sync');
    ipcRenderer.removeAllListeners('mac-checked');
    ipcRenderer.removeAllListeners('error-sync');
    ipcRenderer.removeAllListeners('system-info-fetched');
    ipcRenderer.removeAllListeners('synced');
    // console.log('after destroy', ipcRenderer);
  }
};
</script>
