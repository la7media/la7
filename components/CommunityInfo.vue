<!-- components/CommunityInfo.vue -->
<script setup lang="ts">
import type { CommunityInfo } from "~/composables/usePricing";

interface Props {
  info: CommunityInfo;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-16">
    <div class="max-w-4xl mx-auto text-center">
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-6"
      >
        <svg
          class="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <h3 class="text-3xl font-bold text-gray-900 mb-4">{{ info.title }}</h3>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        {{ info.description }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div
          v-for="(feature, index) in info.features"
          :key="index"
          class="flex items-center space-x-3"
        >
          <div class="flex-shrink-0">
            <svg
              class="w-5 h-5 text-orange-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span class="text-gray-700 font-medium">{{ feature }}</span>
        </div>
      </div>

      <div class="mt-8">
        <button
          class="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
        >
          Saber Más sobre Inscripciones
        </button>
      </div>
    </div>
  </div>
</template>
