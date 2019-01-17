<template>
  <BaseCard flat :isFullHeight="true" color="grey lighten-2">

    <VLayout fill-height align-center justify-center>
      <div class="variable-wrapper" v-if="selectedLabel">
        <div v-for="(key, index) in keys" :key="index">
          <VarDisplay :name="key" :data="variables[key].styles">
            {{ variables[key].value }}
          </VarDisplay>
        </div>
      </div>
      <VImg
        v-if="selectedLabel && user"
        alt="label"
        :src="require(`../../data/${user.client._id}${selectedLabel.labelPng.url}`)"
        contain
        class="preview-img"/>
      <VLayout
        v-if="selectedLabel && previewLoader"
        class="loader-bg"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <VProgressCircular indeterminate color="teal"></VProgressCircular>
      </VLayout>
    </VLayout>
  </BaseCard>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { mapState, mapMutations } from 'vuex';
// import { nymVars } from '@/api/constants';

export default {
  components: { VarDisplay: () => import('@/components/Printer/VarDisplay') },
  data() {
    return { label: null };
  },
  computed: {
    ...mapState('printer', ['selectedLabel', 'previewLoader', 'variables']),
    ...mapState('auth', ['user']),
    keys() {
      return Object.keys(this.variables);
    }
  },
  mounted() {
    this.setPreviewLoader(false);
  },
  methods: { ...mapMutations('printer', ['setPreviewLoader', 'setVariableValue']) }
};

</script>

<style scoped>
.preview-img {
  height: 87vh;
}

.loader-bg {
  position: absolute;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
}

.variable-wrapper {
  width: 58vh;
  height: 87vh;
  position: absolute;
  z-index: 2;
}

.nomen {
  position: absolute;
}
</style>
