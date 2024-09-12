<script lang="ts" setup>
const project_id = useRoute().params.id;
const { data } = await useAsyncData("project", async () => {
  const project = await $fetch(`/api/projects/${project_id}`);
  return {
    project,
  };
});

const project = ref(data.value.project);
</script>

<template>
  <section>
    <h1>
      {{ project.name }}
    </h1>
    <figure>
      <img :src="project.photo" alt="" />
    </figure>
  </section>
</template>

<style></style>
