<script setup lang="ts">
const $dialog: Ref<HTMLDialogElement | null> = ref(null);

const toggleDialog = () => {
  const modal = $dialog.value as HTMLDialogElement;
  modal.open ? modal.close() : modal.showModal();
};

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === $dialog.value) {
    toggleDialog();
  }
};

defineExpose({
  toggleDialog,
});
</script>

<template>
  <dialog ref="$dialog" class="modal" @click="handleBackdropClick">
    <button class="modal-close" @click="toggleDialog">×</button>
    <div class="modal-content">
      <slot></slot>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
.modal {
  border: none;
  border-radius: pxToRem(10);
  background-color: white;
  padding: 0;
  scale: 0;
  opacity: 0;
  transition: scale 0.3s ease-in-out, opacity 0.3s ease-in-out,
    display 0.3s ease allow-discrete;
  &[open] {
    scale: 1;
    opacity: 1;

    @starting-style {
      scale: 0;
      opacity: 0;
    }
  }

  &-content {
    padding: pxToRem(20);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  &-close {
    position: absolute;
    top: pxToRem(10);
    right: pxToRem(10);
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
