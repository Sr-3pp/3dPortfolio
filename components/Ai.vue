<script setup lang="ts">
const question: Ref<string> = ref("");
const messages: Ref<string[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const ask = async () => {
  const _question = question.value.trim();
  loading.value = true;
  messages.value.push({ author: "me", content: question.value });
  question.value = "";
  const { response }: any = await $fetch(`/api/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { question: _question },
  });
  messages.value.push({ author: "ia", content: response });
  loading.value = false;
};
</script>

<template>
  <div class="ai-agent">
    <h3>Ai</h3>
    <div class="ai-agent-messages">
      <div
        class="ai-agent-message"
        :class="message.author"
        v-for="message in messages"
      >
        <small>{{ message.author }}</small>
        <span>{{ message.content }}</span>
      </div>
    </div>

    <div class="ai-agent-ask">
      <input v-model="question" type="text" />
      <button @click="ask" :disabled="loading">Ask</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ai-agent {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-messages {
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    overflow: auto;

    margin-bottom: pxToRem(20);
  }

  &-message {
    display: flex;
    gap: pxToRem(10);
    white-space: break-spaces;
    padding: pxToRem(6);
    border-radius: pxToRem(5);

    small {
      display: flex;
      align-items: center;
      justify-content: center;
      width: pxToRem(20);
      height: pxToRem(20);
      flex-shrink: 0;
      margin-bottom: auto;
      border-radius: pxToRem(99);
    }

    &.me {
      justify-content: flex-end;
      flex-direction: row-reverse;
      margin-left: pxToRem(16);
      small {
        color: $color-light;
        background-color: $color-dark;
      }
    }

    &.ia {
      background-color: $color-dark;
      color: $color-light;
      margin-right: pxToRem(16);
      small {
        color: $color-dark;
        background-color: $color-light;
      }
    }
  }

  &-ask {
    display: flex;
    gap: pxToRem(10);
  }
}
</style>
