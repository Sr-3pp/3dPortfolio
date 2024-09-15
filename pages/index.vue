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
const $imageGallery: Ref<any> = ref(null);
const $iconGallery: Ref<any> = ref(null);
const $contentManager: Ref<any> = ref(null);
const openGallery = (library: string) => {
  (library === "icon"
    ? $iconGallery
    : library == "content"
    ? $contentManager
    : $imageGallery
  ).value.toggleDialog();
};
const colorPalettes = [
  ["#E0F7EF", "#A4DBC1", "#D9F2E9", "#F4F9F7", "#B2E4D3"],
  ["#FF8552", "#FFC857", "#6B4B9E", "#2A9D8F", "#F4A261"],
  ["#1E2D24", "#2C3E50", "#34495E", "#1F2F16", "#22313F"],
];
</script>

<template>
  <div class="container">
    <Projects />
    <button @click="openGallery('image')">open image gallery</button>
    <button @click="openGallery('icon')">open icon gallery</button>
    <button @click="openGallery('content')">open content manager</button>
    <LazyHobbies />

    <ul class="color-palette__list">
      <li class="color-palette__list__item" v-for="palette in colorPalettes">
        <span
          class="color-palette__list__item__color"
          v-for="color in palette"
          :style="{ backgroundColor: color }"
        ></span>
      </li>
    </ul>
  </div>
  <LazyThreeCanvas />

  <LazyModal ref="$imageGallery">
    <LazyImageGallery />
  </LazyModal>

  <LazyModal ref="$iconGallery">
    <LazyIconGallery />
  </LazyModal>

  <LazyModal ref="$contentManager">
    <ContentManager />
  </LazyModal>
</template>

<style lang="scss">
.container {
  > *:not(:last-child) {
    margin-bottom: pxToRem(20);
  }
}
.tres {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}

.color-palette {
  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: pxToRem(20);
  }
  &__list__item {
    display: flex;
    gap: pxToRem(10);
  }
  &__list__item__color {
    width: pxToRem(50);
    height: pxToRem(50);
    border-radius: pxToRem(5);
  }
}
</style>
