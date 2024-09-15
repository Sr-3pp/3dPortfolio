<script setup lang="ts">
const defaultIcon = "home";
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
  { label: "Home", path: "/", icon: "home" },
  ...data.value.site.map((section: any, i: number) => ({
    label: section.meta["menu-label"],
    icon: section.meta["menu-icon"] || defaultIcon,
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
          <nuxt-link role="menuitem" :to="item.path">
            <Icon class="navbar-nav-item-icon" :name="item.icon" />
            <span class="navbar-nav-item-label">
              {{ item.label }}
            </span>
          </nuxt-link>
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
    padding: 0;
    margin: 0;
    display: flex;
  }
  &-nav-item {
    --size: #{pxToRem(16)};
    --bg: #{$color-primary};
    display: flex;
    align-items: center;
    list-style-type: none;
    color: $color-light;
    position: relative;
    margin: 0 pxToRem(20);
    > a,
    > button {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: pxToRem(10);
      background-color: var(--bg);
      border-bottom-left-radius: pxToRem(16);
      border-bottom-right-radius: pxToRem(16);
      color: currentColor;
      width: pxToRem(100);
      max-width: pxToRem(40);
      transition: max-width 0.3s ease-in-out;
    }

    &-icon {
      width: pxToRem(20);
      height: pxToRem(20);
      &.icon {
        color: currentColor;
      }
    }

    &-label {
      display: flex;
      overflow: hidden;
      max-width: 0%;
      transition: max-width 0.3s ease-in-out, margin-left 0.3s ease-in-out;
    }

    &::after,
    &::before {
      content: "";
      display: block;
      width: var(--size);
      height: var(--size);
      background: radial-gradient(
        circle at 0% -0%,
        transparent var(--size),
        var(--bg) var(--size)
      );
      position: absolute;
      top: 0;
    }

    &::before {
      right: 100%;
      transform: rotate(-90deg);
    }

    &::after {
      left: 100%;
      transform: rotate(180deg);
    }

    &:hover {
      --bg: #{$color-secondary};
      > * {
        background-color: $color-secondary;
        color: $color-dark;
        max-width: 300px;
      }

      .navbar-nav-item-label {
        margin-left: pxToRem(10);
        max-width: 100%;
      }
    }
  }
}
</style>
