<template>
  <BaseCard>
    <BaseFormTitle>
        Soporte
    </BaseFormTitle>
    <VList three-line>
        <VListTile avatar>
        <VListTileAvatar color="teal">
            <span class="white--text headline">R</span>
        </VListTileAvatar>

        <VListTileContent>
            <VListTileTitle>Rodolfo Pérez Ramírez</VListTileTitle>
            <VListTileSubTitle>rodolfoperez@gruppesolutions.com.mx</VListTileSubTitle>
            <VListTileSubTitle>Tel: 222 292 6768</VListTileSubTitle>
        </VListTileContent>
        </VListTile>
        <VListTile>
        <VListTileAvatar color="blue-grey">
            <span class="white--text headline">G</span>
        </VListTileAvatar>

        <VListTileContent>
            <VListTileTitle>Genaro Antonio Trujillo Vargas</VListTileTitle>
            <VListTileSubTitle>genarotrujillo@gruppesolutions.com.mx</VListTileSubTitle>
            <VListTileSubTitle>Tel: 222 464 8363</VListTileSubTitle>
        </VListTileContent>
        </VListTile>
        <VListTile>
        <VListTileAvatar color="indigo">
            <span class="white--text headline">A</span>
        </VListTileAvatar>

        <VListTileContent>
            <VListTileTitle>Alejandro Pérez Ramírez</VListTileTitle>
            <VListTileSubTitle>alejandroperez@gruppesolutions.com.mx</VListTileSubTitle>
            <VListTileSubTitle>Tel: 222 548 8820</VListTileSubTitle>
        </VListTileContent>
        </VListTile>
    </VList>
    <VCardActions>
        <VSpacer />
        <VBtn flat @click="$emit('close')">Cerrar</VBtn>
    </VCardActions>
  </BaseCard>
</template>

<script>
export default {};
</script>
