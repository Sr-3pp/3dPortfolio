<script setup lang="ts">
const { hobbies } = await $fetch("/api/content/content/about.json");
</script>

<template>
  <div class="hobbies">
    <h2>Hobbies</h2>
    <ul class="hobbies-list">
      <li v-for="hobbie in hobbies">
        <span>
          {{ hobbie.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.hobbies {
  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: pxToRem(20);
  }
}
</style>
