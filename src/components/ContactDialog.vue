<template>
  <BaseCard>
    <BaseFormTitle>
        Soporte
    </BaseFormTitle>
    <VList three-line>
        <VListTile avatar v-for="(contact, i) in contacts" :key="i">
             <VListTileAvatar :color="contact.color">
                <span class="white--text headline">{{ contact.name.charAt(0) }}</span>
            </VListTileAvatar>
            <VListTileContent>
                <VListTileTitle>{{ contact.name }}</VListTileTitle>
                <VListTileSubTitle>{{ contact.email }}</VListTileSubTitle>
                <VListTileSubTitle>Tel: {{ contact.phone }}</VListTileSubTitle>
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
export default {
  data() {
    return {
      contacts: [
        {
          name: 'Genaro Antonio Trujillo Vargas',
          email: 'genarotrujillo@gruppesolutions.com.mx',
          phone: '222 464 8363',
          color: 'blue-grey'
        },
        {
          name: 'Rodolfo Pérez Ramírez',
          email: 'rodolfoperez@gruppesolutions.com.mx',
          phone: '222 292 6768',
          color: 'teal'
        },
        {
          name: 'Alejandro Pérez Ramírez',
          email: 'alejandroperes@gruppesolutions.com.mx',
          phone: '222 548 8820',
          color: 'indigo'
        },
      ]
    };
  },
};
</script>
