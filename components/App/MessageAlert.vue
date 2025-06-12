<!-- components/MessageAlert.vue -->
<script setup lang="ts">
interface Props {
  type: "error" | "success";
  message?: string;
}

defineProps<Props>();

const icons = {
  error:
    "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
  success:
    "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
};

const styles = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-700",
};
</script>

<template>
  <div
    v-if="message"
    class="border px-4 py-3 rounded-md text-sm flex items-start"
    :class="styles[type]"
  >
    <svg
      class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fill-rule="evenodd" :d="icons[type]" clip-rule="evenodd" />
    </svg>
    <slot name="message">
      {{ message }}
    </slot>
  </div>
</template>
