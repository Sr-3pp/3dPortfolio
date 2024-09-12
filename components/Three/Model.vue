<script setup lang="ts">
import * as THREE from "three";
import { useLoader } from "@tresjs/core";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const props = defineProps<{
  url: string;
}>();

const { scene } = await useLoader(GLTFLoader, props.url);
</script>

<template>
  <primitive :object="scene" />
</template>

<style scoped></style>
