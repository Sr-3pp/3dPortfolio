<script setup lang="ts">
withDefaults(
  defineProps<{
    position?: string;
  }>(),
  {
    position: "bottomRight",
  }
);

const positions = {
  center: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  bottomLeft: {
    bottom: "20px",
    left: "20px",
  },
  bottomRight: {
    bottom: "20px",
    right: "20px",
  },
  topLeft: {
    top: "20px",
    left: "20px",
  },
  topRight: {
    top: "20px",
    right: "20px",
  },
};
</script>

<template>
  <aside class="popover" :style="positions[position]">
    <div class="popover-content">
      <slot />
    </div>
  </aside>
</template>

<style scoped lang="scss">
.popover {
  position: fixed;
  z-index: 2;
  width: pxToRem(300);
  background-color: $color-light;
  border-radius: pxToRem(5);
  max-height: calc(100dvh - pxToRem(40));
  display: flex;

  &-content {
    padding: pxToRem(20);
    color: $color-dark;
    display: flex;
    flex-direction: column;
  }
}
</style>
