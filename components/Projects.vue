<script setup lang="ts">
const { data }: any = await useAsyncData("projects", async () => {
  const { results } = await $fetch("/api/projects");

  return {
    projects: results,
  };
});

const projects = ref(data.value.projects);
</script>

<template>
  <h1>3d Portfolio</h1>
  <ul>
    <li v-for="project in projects" :key="project.id">
      <nuxt-link no-prefetch :to="`/projects/${project.id}`">{{
        project.name
      }}</nuxt-link>
    </li>
  </ul>
</template>

<style scoped></style>
