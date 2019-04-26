<template>
  <VApp>
    <FontUploader/>

    <VNavigationDrawer
      v-if="isLoggedIn"
      v-model="drawer"
      :mini-variant="mini"
      dark
      fixed
      app
      width="250"
      permanent
    >
      <VList class="pa-1">
        <VListTile v-if="mini" @click.stop="mini = !mini">
          <VListTileAction>
            <VIcon>chevron_right</VIcon>
          </VListTileAction>
        </VListTile>

        <VListTile avatar tag="div">
          <VListTileAvatar >
            <img :src="require('./assets/gruppe.png')">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>Gruppe ZEBRA</VListTileTitle>
          </VListTileContent>

          <VListTileAction>
            <VBtn icon @click.stop="mini = !mini">
              <VIcon>chevron_left</VIcon>
            </VBtn>
          </VListTileAction>
        </VListTile>
      </VList>

      <VList class="pt-0">
        <VDivider light></VDivider>

        <VListTile
          v-for="item in filteredMenu"
          :key="item.title"
          :to="{ name: item.name }"
          exact
        >
          <VListTileAction>
            <VIcon>{{ item.icon }}</VIcon>
          </VListTileAction>

          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
          </VListTileContent>
        </VListTile>

        <VListTile
          v-if="!isAdmin"
          @click="sync"
        >
          <VListTileAction>
            <VIcon>sync</VIcon>
          </VListTileAction>

          <VListTileContent>
            <VListTileTitle>Sincronizar</VListTileTitle>
          </VListTileContent>
        </VListTile>

        <VListTile
          @click="setFontDialog(true)"
        >
          <VListTileAction>
            <VIcon>font_download</VIcon>
          </VListTileAction>

          <VListTileContent>
            <VListTileTitle>Subir fuentes</VListTileTitle>
          </VListTileContent>
        </VListTile>

        <VDivider light></VDivider>

        <VListTile
          @click="logout"
        >
          <VListTileAction>
            <VIcon>exit_to_app</VIcon>
          </VListTileAction>

          <VListTileContent>
            <VListTileTitle>Cerrar sesión</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>

    <VContent>
      <Transition name="slide" mode="out-in">
        <RouterView />
      </Transition>
    </VContent>

    <DeleteConfirm v-if="isAdmin"/>
    <OfflineSnackbar v-if="$route.name !== 'Login' && !isAdmin"/>
    <Snackbar />
  </VApp>
</template>

<script>
import menu from '@/api/menu';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
// import appMenu from '@/api/desktop-menu';

export default {
  name: 'App',
  components: {
    DeleteConfirm: () => import('@/components/DeleteConfirm'),
    Snackbar: () => import('@/components/Snackbar'),
    OfflineSnackbar: () => import('@/components/OfflineSnackbar'),
    FontUploader: () => import('@/components/FontUploader')
  },
  mounted() {
    // appMenu(this);
    this.$eventHub.$on('closeDrawer', () => {
      this.mini = true;
    });

    ipcRenderer.on('update-available', () => {
      this.logout();
    });

    this.setIsOnline(navigator.onLine);
    window.addEventListener('online', () => { this.onNetworkRestored(); });
    window.addEventListener('offline', () => { this.setIsOnline(false); });
  },
  data() {
    return {
      drawer: null,
      menu,
      mini: true
    };
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'isAdmin']),
    ...mapState(['isReady']),
    ...mapState('auth', ['user']),
    filteredMenu() {
      return this.isAdmin
        ? this.menu.filter(item => item.isAdmin)
        : this.menu.filter(item => !item.isAdmin);
    }
  },
  methods: {
    ...mapActions('auth', ['signOut']),
    ...mapMutations(['setFontDialog', 'setIsOnline']),
    ...mapMutations('printer', ['setIsSyncing', 'setLabels', 'setConfig']),
    logout() {
      this.signOut().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
    onNetworkRestored() {
      console.log('network restored');
      this.setIsOnline(true);
      this.$eventHub.$emit('sync');
      this.$eventHub.$emit('network-restored');
    },
    sync() {
      this.$eventHub.$emit('sync');
    }
  },
  watch: {
    isReady(val) {
      // console.log(this.$route);
      if (this.$route.name === 'Progress') {
        return;
      }
      if (val && this.isLoggedIn) {
        this.$router.push({ name: this.isAdmin ? 'Labels' : 'Printer' });
      }
    }
  },
  beforeDestroy() {
    this.$eventHub.$off('closeDrawer');
    window.removeEventListener('online', this.onNetworkRestored());
    window.removeEventListener('offline', this.setIsOnline(false));
  }
};
</script>

<style>
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
