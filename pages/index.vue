<script lang="ts" setup>
const { data } = await useAsyncData("projects", async () => {
  const { results } = await $fetch("/api/projects");
  return {
    projects: results,
  };
});
const projects = ref(data.value.projects);
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>3d Portfolio</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <nuxt-link :to="`/projects/${project.id}`">{{
          project.name
        }}</nuxt-link>
      </li>
    </ul>

    <TresCanvas class="threede" clear-color="transparent" window-size>
      <TresPerspectiveCamera :position="[5, 5, 10]" :look-at="[0, 0, 0]" />
      <ThreeOrbitControls />
      <Suspense>
        <ThreeModel url="/models/vueLogo.glb" />
      </Suspense>
      <TresAmbientLight :intensity="1.5" />
    </TresCanvas>
  </div>
</template>

<style>
.threede {
  position: fixed;
  z-index: -1;
}
</style>
