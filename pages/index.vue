<script lang="ts" setup></script>

<template>
  <div class="container">
    <Projects />

    <LazyHobbies />

    <LazyImageGallery />
  </div>
</template>

<style lang="scss">
.container {
  > *:not(:last-child) {
    margin-bottom: pxToRem(20);
  }
}
</style>
