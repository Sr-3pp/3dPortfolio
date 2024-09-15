<script setup lang="ts">
const { data }: any = await useAsyncData(async () => {
  const icons = (await $fetch("/api/blob/icons")).map((icon: any) => ({
    name: icon.pathname.replace("icons/", "").replace(".svg", ""),
    pathname: icon.pathname,
  }));

  return {
    icons,
  };
});

const icons = ref(data.value.icons);

const blobIcon: any = ref(null);
const previewIcon = ref("");

const uploadSvg = async (svg: File, $fileInput: HTMLInputElement) => {
  const formData = new FormData();
  formData.append("file", svg);
  formData.append("types", "image");
  formData.append("prefix", "icons");

  const icon = await $fetch("/api/blob", {
    method: "PUT",
    body: formData,
  });

  icons.value.push({
    name: icon.pathname.replace("icons/", "").replace(".svg", ""),
    pathname: icon.pathname,
  });

  blobIcon.value = null;
  $fileInput.value = "";
};

const processIcon = (svg: File, callback: Function) => {
  const reader = new FileReader();

  reader.onload = async (event: any) => {
    const content = event.target.result;
    const template = document.createElement("template");
    template.innerHTML = content;
    const $svg = template.content.firstChild as SVGElement;
    const path = $svg.querySelectorAll("path");
    const viewBox =
      $svg.getAttribute("viewBox") !== null
        ? $svg.getAttribute("viewBox")
        : `0 0 ${$svg.getAttribute("width") || 24} ${
            $svg.getAttribute("height") || 24
          }`;
    const style = svg.name.replace(".svg", "").split("-")[1] || "s";
    const iconTemplate = `
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="${style}" viewBox="${viewBox}">
    ${Array.from(path)
      .map((p: any) => p.outerHTML)
      .join("\n")}
  </symbol>
</svg>
`;
    const svgFile = new File(
      [iconTemplate],
      `${svg.name.replace(".svg", "").split("-")[0]}-${style}.svg`,
      {
        type: "image/svg+xml",
      }
    );

    if (callback) {
      await callback(svgFile, template.content.firstChild as SVGElement);
    }
  };

  reader.readAsText(svg);
};

const handleIcon = (event: Event) => {
  const $fileInput = event.target as any;
  blobIcon.value = $fileInput.files[0];

  processIcon(blobIcon.value, (_: File, svgElement: SVGElement) => {
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "100%");
    previewIcon.value = svgElement.outerHTML;
  });
};

const submitIcon = async (event: Event) => {
  const $fileInput = (event.target as any)[0];
  const svg: any = blobIcon.value;

  processIcon(svg, async (svgFile: File) => {
    await uploadSvg(svgFile, $fileInput);
  });
};

const deleteIcon = async (name: string, idx: number) => {
  if (!confirm("Delete icon?")) return;
  await $fetch(`/api/blob/${name}`, {
    method: "DELETE",
  });

  icons.value.splice(idx, 1);
};
</script>

<template>
  <div class="icons">
    <h2>Icons</h2>
    <ul class="icons-list">
      <li class="icons-list-item">
        <form @submit.prevent="submitIcon">
          <label class="icons-icon-label">
            <input type="file" @change="handleIcon" accept="*/svg" />
            <span class="icons-icon-preview" v-html="previewIcon"></span>
            <span class="icons-icon-label-label" v-if="!blobIcon">
              Add Icon
            </span>
          </label>
          <button>Submit</button>
        </form>
      </li>
      <li class="icons-list-item" v-for="(icon, i) in icons">
        <button @click="deleteIcon(icon.pathname, i)">delete</button>
        <Icon :name="icon.name" />
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

  &-icon-label {
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    position: relative;
    width: pxToRem(100);
    height: pxToRem(100);
    input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: 0;
    }
  }

  &-icon-preview {
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
    border: 1px solid $color-secondary;
    display: flex;
  }

  &-icon-label-label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}
</style>
