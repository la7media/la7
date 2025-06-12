<script setup lang="ts">
const { toggleFilterLike, filterLike } = useLike();
</script>

<template>
  <button
    :class="{
      'bg-gray-200 text-gray-800 hover:bg-red-300': !filterLike,
      'bg-red-700 text-white hover:bg-red-500': filterLike,
    }"
    class="inline-flex items-center justify-center rounded-full transition-colors w-10 h-10"
    @click="toggleFilterLike"
  >
    <IconsLiked />
  </button>
</template>
