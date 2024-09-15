<script setup lang="ts">
const { data }: any = await useAsyncData(async () => {
  const icons = (await $fetch("/api/blob/icons")).map((icon: any) => ({
    pathname: icon.pathname.replace("icons/", "").replace(".svg", ""),
  }));

  return {
    icons,
  };
});

const icons = ref(data.value.icons);
</script>

<template>
  <div class="icons">
    <ul class="icons-list">
      <li class="icons-list-item" v-for="icon in icons">
        <Icon :name="icon.pathname" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.icons {
  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(20);
  }
  &-list-item {
    display: flex;
    gap: pxToRem(10);
    color: $color-secondary;

    .icon {
      width: pxToRem(50);
      height: pxToRem(50);
      color: currentColor;
    }
  }
}
</style>
