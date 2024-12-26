<script setup lang="ts">
const $iconModal: any = inject("iconModal");

const { data }: any = await useAsyncData(async () => {
  const contents = (await $fetch("/api/blob/content")).map((content: any) => ({
    name: content.pathname.replace("content/", "").replace(".json", ""),
    pathname: content.pathname,
  }));

  return {
    contents,
  };
});

const contents = ref(data.value.contents);
const currentContent: any = ref(null);
const mediaSetters: any = inject("mediaSetters");

const getContent = async (pathname: string) => {
  currentContent.value = await $fetch(`/api/content/${pathname}`);
  currentContent.value.meta.fileName = pathname.replace("content/", "");
};

const updateMeta = async () => {
  currentContent.value.meta.fileName ??= `${currentContent.value.meta[
    "menu-label"
  ]
    .toLowerCase()
    .replace(" ", "-")}.json`;

  const jsonFile = new File(
    [JSON.stringify(currentContent.value)],
    `${currentContent.value.meta.fileName}`,
    {
      type: "application/json",
    }
  );
  const formData = new FormData();
  formData.append("file", jsonFile);
  formData.append("types", "application/json");
  formData.append("prefix", "content");

  await $fetch("/api/blob", {
    method: "PUT",
    body: formData,
  });
};

const handleIconGallery = () => {
  $iconModal.value.toggleDialog();
};

const createContent = async () => {
  const content = {
    meta: {
      title: "",
      description: "",
      "menu-label": "",
      "menu-icon": "",
    },
    content: "",
  };

  currentContent.value = content;
};

watch(mediaSetters, ({ icon, image }) => {
  if (icon) {
    currentContent.value.meta["menu-icon"] = icon.name;
    $iconModal.value.toggleDialog();
  }
});
</script>

<template>
  <div>
    <h2>Contents</h2>
    <ul>
      <li>
        <button @click="createContent">New Content</button>
      </li>
      <li v-for="content in contents" :key="content.name">
        <button @click="getContent(content.pathname)">
          {{ content.name }}
        </button>
      </li>
    </ul>
    <div v-if="currentContent">
      <h3>Content Meta</h3>
      <form @submit.prevent="updateMeta">
        <label>
          <input
            type="text"
            placeholder="title"
            v-model="currentContent.meta.title"
          />
          <span> Title </span>
        </label>
        <label>
          <input
            type="text"
            placeholder="Description"
            v-model="currentContent.meta.description"
          />
          <span> Description </span>
        </label>
        <label>
          <input
            type="text"
            placeholder="Menu Label"
            v-model="currentContent.meta['menu-label']"
          />
          <span> Menu Label </span>
        </label>
        <button type="button" @click="handleIconGallery">
          <Icon :name="currentContent.meta['menu-icon']" />
        </button>

        <button>Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
