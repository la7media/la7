<script setup lang="ts">
const { size = "1.5em" } = defineProps<{
  size?: string;
}>();
</script>

<template>
  <span :class="$attrs.class">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 48 48"
    >
      <!-- Icon from IconPark Solid by ByteDance - https://github.com/bytedance/IconPark/blob/master/LICENSE -->
      <path
        fill="currentColor"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
        d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
      />
    </svg>
  </span>
</template>
