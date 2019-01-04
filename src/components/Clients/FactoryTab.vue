<template>
  <VList two-line subheader>
    <!-- <VSubheader inset>Folders</VSubheader> -->

    <VListTile
      v-for="(item, i) in items"
      :key="i"
      avatar
    >
      <VListTileAvatar>
        <VIcon :class="[item.iconClass]">{{ item.icon }}</VIcon>
      </VListTileAvatar>

      <VListTileContent>
        <VListTileTitle>{{ item.title }}</VListTileTitle>
        <VListTileSubTitle>{{ item.subtitle }}</VListTileSubTitle>
      </VListTileContent>

      <VListTileAction>
        <VBtn icon ripple>
          <VIcon color="grey lighten-1">more_vert</VIcon>
        </VBtn>
      </VListTileAction>
    </VListTile>
  </VList>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          title: 'Tlaxcala',
          subtitle: '65,000 impresiones'
        },
        {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          title: 'Merida',
          subtitle: '65,000 impresiones'
        },
        {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          title: 'Jalisco',
          subtitle: '65,000 impresiones'
        },
        {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          title: 'Merida',
          subtitle: '65,000 impresiones'
        },
        {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          title: 'Jalisco',
          subtitle: '65,000 impresiones'
        }
      ]
    };
  }
};
</script>
