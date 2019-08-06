<template>
  <BaseCard flat :isFullHeight="true" color="grey lighten-2">

    <VLayout fill-height align-center justify-center>
      <div class="variable-wrapper" v-bind:style="{width}" v-if="selectedLabel">
        <div v-for="(key, index) in keys" :key="index">
          <div v-for="(style, j) in variables.fields[key].styles" :key="index + j">
            <VarDisplay v-if="!isMock || key == 'weight'" :name="key" :data="style">
              {{ formatValue(key) }}
            </VarDisplay>
          </div>

        </div>
      </div>
      <VImg
        v-if="selectedLabel && user && imgPath"
        alt="label"
        :src="imgPath"
        contain
        class="preview-img"
        :style="{ transform: user.client.settings.invert ? 'rotate(180deg)' : 'rotate(0deg)' }"/>
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
import moment from 'moment';
import { ipcRenderer } from 'electron';

export default {
  components: { VarDisplay: () => import('@/components/Printer/VarDisplay') },
  data() {
    return {
      label: null,
      imgPath: null,
      isMock: false,
    };
  },
  computed: {
    ...mapState('printer', ['selectedLabel', 'previewLoader', 'variables']),
    ...mapState('auth', ['user']),
    width() {
      if (this.user && this.user.client) {
        return `${87 / this.user.client.settings.ratio}vh`;
      }
      return 0;
    },
    keys() {
      return Object.keys(this.variables.fields).filter(variable => (!!this.variables.fields[variable].styles));
    }
  },
  mounted() {
    this.$eventHub.$on('toggle-mock', isMock => {
      this.isMock = isMock;
    });
    this.setPreviewLoader(false);
    ipcRenderer.on('image-ready', (e, label) => {
      this.imgPath = label;
    });
  },
  beforeDestroy() {
    this.$eventHub.$off('toggle-mock');
  },
  methods: {
    ...mapMutations('printer', ['setPreviewLoader', 'setVariableValue']),
    formatValue(key) {
      const field = this.variables.fields[key];
      let formattedValue = field.value;
      if (field.fromSettings) {
        formattedValue = this.selectedLabel.settings ? this.selectedLabel.settings[key] : '';
      }

      const addTo = this.variables.fields[key].addTo;
      const dateFormat = this.variables.fields[key].dateFormat;
      // console.log(addTo);
      if (formattedValue && formattedValue.length && addTo && dateFormat) {
        formattedValue = moment(this.variables.fields[addTo].value).add(formattedValue, 'days').format(dateFormat);
      }

      if (this.variables.fields[key].type === 'date') {
        // console.log(formattedValue);
        formattedValue = moment(formattedValue).format(field.dateFormat);
      }

      return `${formattedValue}${key === 'weight' ? 'Kg' : ''}`;
    }
  }
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
