<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const tres: Ref<HTMLElement | null> = ref(null);

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
  (tres.value as HTMLElement).appendChild(renderer.domElement);

  // Create a GLTFLoader
  const loader = new GLTFLoader();

  // Load the GLB model
  loader.load(
    "/blob/models/vueLogo.glb", // Replace with the actual path to your GLB file
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
</script>

<template>
  <div class="tres" ref="tres"></div>
</template>

<style scoped></style>
