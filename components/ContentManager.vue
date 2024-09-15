<script setup lang="ts">
const { data }: any = await useAsyncData(async () => {
  const contents = (await $fetch("/api/blob/content")).map((icon: any) => ({
    name: icon.pathname.replace("content/", "").replace(".svg", ""),
    pathname: icon.pathname,
  }));

  return {
    contents,
  };
});

const contents = ref(data.value.contents);
</script>

<template>
  <div>
    <h2>Contents</h2>
    <ul>
      <li v-for="content in contents" :key="content.name">
        {{ content.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
