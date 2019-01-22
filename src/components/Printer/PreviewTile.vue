<template>
  <BaseCard flat :isFullHeight="true" color="grey lighten-2">

    <VLayout fill-height align-center justify-center>
      <div class="variable-wrapper" v-bind:style="{width: '58vh'}" v-if="selectedLabel">
        <div v-for="(key, index) in keys" :key="index">
          <div v-for="(style, j) in variables.fields[key].styles" :key="index + j">
            <VarDisplay :name="key" :data="style">
              {{ variables.fields[key].value }} {{ key === 'weight' ? 'Kg' : '' }}
            </VarDisplay>
          </div>

        </div>
      </div>
      <VImg
        v-if="selectedLabel && user"
        alt="label"
        :src="`/data/${this.user.client._id}${this.selectedLabel.labelPng.url}`"
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
  watch: {
    selectedLabel(val) {
      console.log('watch', val, this.variables);
    }
  },
  computed: {
    ...mapState('printer', ['selectedLabel', 'previewLoader', 'variables']),
    ...mapState('auth', ['user']),
    keys() {
      return Object.keys(this.variables.fields).filter(variable => (!!this.variables.fields[variable].styles));
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
  /* width: 58vh; */
  height: 87vh;
  position: absolute;
  z-index: 2;
}

.nomen {
  position: absolute;
}
</style>
