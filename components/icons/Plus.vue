<script setup lang="ts">
const { size = "1.5em" } = defineProps<{
  size?: string;
}>();
</script>

<template>
  <span :class="$attrs.class"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
    >
      <!-- Icon from Huge Icons by Hugeicons - undefined -->
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M12 4v16m-8-8h16"
        color="currentColor"
      />
    </svg>
  </span>
</template>
