<template>
  <VApp>
    <!-- <VToolbar app>
      <VToolbarTitle class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </VToolbarTitle>
      <VSpacer></VSpacer>
      <VBtn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </VBtn>
    </VToolbar> -->

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
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
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

      <!-- <VToolbar flat>
        <VList v-if="!mini">
          <VListTile>
            <VListTileTitle class="title">
              ZEBRA PRINTER
            </VListTileTitle>
          </VListTile>
        </VList>
        <VToolbarItems>
          <VBtn icon @click.stop="mini = !mini">
            <VIcon>chevron_left</VIcon>
          </VBtn>
        </VToolbarItems>
      </VToolbar> -->


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
      </VList>
    </VNavigationDrawer>

    <VContent>
      <Transition name="slide" mode="out-in">
        <RouterView />
      </Transition>
    </VContent>

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
