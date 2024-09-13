<script lang="ts" setup></script>

<template>
  <div class="container">
    <NuxtRouteAnnouncer />

    <Projects />

    <LazyHobbies />

    <LazyImageGallery />
  </div>
  <LazyThreeCanvas />
</template>

<style lang="scss">
.container {
  > *:not(:last-child) {
    margin-bottom: pxToRem(20);
  }
}
</style>
