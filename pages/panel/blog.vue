<script setup lang="ts">
const newEntry = ref({
  title: "",
  banner: "",
  content: [],
});

const blog: any = await useAsyncData("blog", async () => {
  const blog = await $fetch("/api/blog");
  return blog;
});

const entryHandler = () => {
  console.log(newEntry.value);
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="entryHandler">
      <label>
        <span>Title</span>
        <input type="text" v-model="newEntry.title" />
      </label>
      <label>
        <span>Banner</span>
        <input
          type="file"
          @change="newEntry.banner = ($event as any).target.files[0]"
        />
      </label>
      <label>
        <textarea v-model="newEntry.content"></textarea>
      </label>

      <button>Submit</button>
    </form>

    <ul>
      <li v-for="entry in blog" :key="entry.title">
        {{ entry.title }}
        <NuxtImg :src="entry.banner" />
        <p>
          {{ entry.content }}
        </p>
      </li>
    </ul>
  </div>
</template>
