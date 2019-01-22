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
        top: `${this.data.top}%`,
        left: `${this.data.left}%`,
        fontWeight: this.data.weight,
        fontSize: `${this.data.fontSize || 14}px`,
        '-webkit-transform': `rotate(${this.data.rotation || 0}deg)`
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
