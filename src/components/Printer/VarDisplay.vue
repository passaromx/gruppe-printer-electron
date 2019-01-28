<template>
  <span
    class="description"
    v-bind:style="styles"
  >
    <slot />
  </span>
</template>

<script>
export default {
  props: ['name', 'data'],
  computed: {
    styles() {
      return {
        width: `${this.data.width}px`,
        top: `${this.data.top}%`,
        bottom: `${this.data.bottom}%`,
        left: `${this.data.left}%`,
        right: `${this.data.right}%`,
        fontWeight: this.data.weight,
        fontSize: `${this.data.fontSize || '1vh'}`,
        '-webkit-transform': `rotate(${this.data.rotation || 0}deg)`,
        'transform-origin': '0% 0%'
      };
    }
  }
};
</script>

<style scoped>
  .description {
    position: absolute;
    z-index: 2;
    line-height: 25px;
  }
</style>
