<script lang="ts" setup>
const project_id = useRoute().params.id;
const { data }: any = await useAsyncData("project", async () => {
  const project = await $fetch(`/api/projects/${project_id}`);
  return {
    project,
  };
});

const project: any = ref(data.value.project);
</script>

<template>
  <section class="container">
    <h1>
      {{ project.name }}
    </h1>
    <figure>
      <img :src="project.photo" alt="" />
    </figure>
  </section>
</template>

<style></style>
