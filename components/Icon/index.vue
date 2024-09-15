<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    variant?: string;
  }>(),
  {
    variant: "s",
  }
);
</script>

<template>
  <span class="icon">
    <svg class="icon-svg">
      <use :href="`/blob/icons/${name}.svg#${variant}`" />
    </svg>
  </span>
</template>

<style scoped lang="scss">
.icon {
  display: inline-block;
  color: $color-primary;
  &-svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}
</style>
