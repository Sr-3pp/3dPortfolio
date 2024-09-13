<script lang="ts" setup>
useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "sr3pp Portfolio",
  meta: [
    {
      name: "description",
      content: "Welcome to Sr3pp's Portfolio",
    },
  ],
});
</script>

<template>
  <div class="container">
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
