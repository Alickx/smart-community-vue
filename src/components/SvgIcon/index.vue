<template>
  <svg aria-hidden="true" class="svg-icon-spin">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    size: {
      type: String,
      default: 'default',
    },
  });
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  const fontSize = reactive({ default: '32px'});
</script>
<style lang="less" scoped>
.svg-icon-spin {
    width: v-bind('props.size || fontSize.default');
    height: v-bind('props.size || fontSize.default');
    fill: v-bind(color);
    vertical-align: middle;
    color: v-bind(color);
  }
</style>
