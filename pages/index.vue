<script lang="ts" setup>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const tres = ref(null);

const blobImage = ref(null);

const { data } = await useAsyncData(async () => {
  const { results } = await $fetch("/api/projects");
  const images = await $fetch("/api/blob/images");

  return {
    projects: results,
    images,
  };
});
const projects = ref(data.value.projects);
const images = ref(data.value.images);

const about = await $fetch("/api/content/content/about.json");

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  model: THREE.Object3D;

onMounted(() => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  tres.value.appendChild(renderer.domElement);

  // Create a GLTFLoader
  const loader = new GLTFLoader();

  // Load the GLB model
  loader.load(
    "/models/vueLogo.glb", // Replace with the actual path to your GLB file
    (gltf) => {
      model = gltf.scene;
      scene.add(model);

      // Optionally, you can adjust the model's position, scale, or rotation here
      //model.position.set(0, 0, 0);
      //model.scale.set(1, 1, 1);
      //model.rotation.set(0, 0, 0);
    },
    (progress) => {
      console.log(
        `Loading model... ${(progress.loaded / progress.total) * 100}% loaded`
      );
    },
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  // Add point light
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 10, 0);
  scene.add(pointLight);

  camera.position.z = 10;

  animate();
});

const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    // Optionally, you can animate the model here
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
};

const blobHandler = async (event) => {
  const formData = new FormData();
  formData.append("file", blobImage.value);

  await $fetch("/api/blob", {
    method: "PUT",
    body: formData,
  });
};
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

    <div>
      <form @submit.prevent="blobHandler">
        <input
          type="file"
          @change="blobImage = $event.target.files[0]"
          accept="*/image"
        />
        <button type="submit">Submit</button>
      </form>
    </div>

    <h2>Hobbies</h2>
    <ul>
      <li v-for="hobbie in about.hobbies">
        <p>
          {{ hobbie.name }}
        </p>
      </li>
    </ul>

    <h2>Images</h2>
    <ul>
      <li v-for="image in images">
        <p>{{ image.pathname }}</p>
        <img :src="`${image.pathname}`" alt="" />
      </li>
    </ul>

    <h2>3d</h2>
    <div ref="tres"></div>
  </div>
</template>

<style>
.threede {
  position: fixed;
  z-index: -1;
}
</style>
