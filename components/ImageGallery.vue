<script setup lang="ts">
const { data }: any = await useAsyncData(async () => {
  const images = await $fetch("/api/blob/img");

  return {
    images,
  };
});

const images = ref(data.value.images);
const blobImage: Ref<string | null> = ref(null);

const blobHandler = async () => {
  const formData = new FormData();
  formData.append("file", blobImage.value as string);

  await $fetch("/api/blob", {
    method: "PUT",
    body: formData,
  });
};
</script>

<template>
  <div class="image-gallery">
    <h2>Images</h2>
    <form @submit.prevent="blobHandler">
      <label>
        <span>Add Image</span>
        <input
          type="file"
          @change="blobImage = ($event as any).target.files[0]"
          accept="*/image"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    <ul class="image-gallery-list">
      <li v-for="image in images">
        <NuxtImg
          loading="lazy"
          :src="`/blob/${image.pathname}`"
          :alt="image.pathname"
          width="300"
          height="300"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.image-gallery {
  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(20);

    img {
      object-fit: cover;
    }
  }
}
</style>
