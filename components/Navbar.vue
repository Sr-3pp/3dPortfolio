<script setup lang="ts">
const { data }: any = await useAsyncData("navbar", async () => {
  const sections = await $fetch("/api/blob/content");
  const site = await Promise.all(
    sections.map((section) => $fetch(`/api/content/${section.pathname}`))
  );
  return {
    sections,
    site,
  };
});
const navbar = ref([
  { label: "Home", path: "/" },
  ...data.value.site.map((section: any, i: number) => ({
    label: section.meta["menu-label"],
    path: data.value.sections[i].pathname
      .replace("content", "")
      .replace(".json", ""),
  })),
]);
</script>

<template>
  <header class="navbar">
    <nav class="navbar-nav">
      <ul class="navbar-nav-list" role="menu">
        <li
          role="presentation"
          v-for="item in navbar"
          :key="item.path"
          class="navbar-nav-item"
        >
          <nuxt-link role="menuitem" :to="item.path">{{
            item.label
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.navbar {
  &-nav {
    display: flex;
    justify-content: center;
  }
  &-nav-list {
    display: flex;
    gap: pxToRem(20);
  }
  &-nav-item {
    list-style-type: none;
  }
}
</style>
