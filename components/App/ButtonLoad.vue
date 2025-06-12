<script lang="ts" setup>
import { toRefs } from "vue";
import { Button } from "~/components/ui/button";

const rawProps = withDefaults(
  defineProps<{
    disabled?: boolean;
    isLoading?: boolean;
    success?: boolean;
  }>(),
  {
    disabled: false,
    isLoading: false,
  }
);

const { disabled, isLoading, success } = toRefs(rawProps);
</script>
<template>
  <Button
    type="submit"
    :disabled="disabled"
    class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
  >
    <span v-if="isLoading" class="flex items-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <slot name="loading"></slot>
    </span>
    <span v-else-if="success"><slot name="success"></slot></span>
    <span v-else><slot></slot></span>
  </Button>
</template>
