<template>
  <VContainer v-if="isLoggedIn">
    <h5 class="display-1 mb-4">Precintos</h5>
    <!-- <BaseHeader label="Etiquetas"/> -->
    <LabelList />
  </VContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import LabelList from '../components/Labels/LabelList';

export default {
  components: { LabelList },
  computed: { ...mapGetters('auth', ['isLoggedIn']), }
};
</script>
