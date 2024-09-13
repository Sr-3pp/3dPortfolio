<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const props = defineProps<{
  url: string;
}>();
</script>

<template>
  <primitive :object="scene" />
</template>

<style scoped></style>
