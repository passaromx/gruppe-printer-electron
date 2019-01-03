<template>
  <VApp>
    <template v-if="!$route.meta.public">
      <VNavigationDrawer
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
            v-for="item in menu"
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

          <VDivider light></VDivider>

          <VListTile
            @click="$router.push({ name: 'Login' })"
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
    </template>

    <template v-else>
      <Transition name="slide" mode="out-in">
        <RouterView />
      </Transition>
    </template>

    <Snackbar />
  </VApp>
</template>

<script>
import menu from '@/api/menu';

export default {
  name: 'App',
  components: { Snackbar: () => import('@/components/Snackbar') },
  data() {
    return {
      drawer: null,
      menu,
      mini: false,
    };
  },
  mounted() {
    this.$eventHub.$on('closeDrawer', () => {
      this.mini = true;
    });
  },
  destroyed() {
    this.$eventHub.$off('closeDrawer');
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
