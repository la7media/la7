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
        d="m19.5 5.5l-.402 6.506M4.5 5.5l.605 10.025c.154 2.567.232 3.85.874 4.774c.317.456.726.842 1.2 1.131c.671.41 1.502.533 2.821.57m10-7l-7 7m7 0l-7-7M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5"
        color="currentColor"
      />
    </svg>
  </span>
</template>
