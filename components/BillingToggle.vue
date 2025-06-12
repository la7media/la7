<!-- components/BillingToggle.vue -->
<script setup lang="ts">
interface Props {
  modelValue: "monthly" | "annual";
}

interface Emits {
  (e: "update:modelValue", value: "monthly" | "annual"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const toggleBilling = () => {
  emit(
    "update:modelValue",
    props.modelValue === "monthly" ? "annual" : "monthly"
  );
};
</script>

<template>
  <div class="flex items-center justify-center space-x-4 mb-12">
    <span
      class="text-sm font-medium transition-colors duration-200"
      :class="modelValue === 'monthly' ? 'text-gray-900' : 'text-gray-500'"
    >
      Mensual
    </span>

    <button
      :class="modelValue === 'annual' ? 'bg-orange-600' : 'bg-gray-200'"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      @click="toggleBilling"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
        :class="modelValue === 'annual' ? 'translate-x-6' : 'translate-x-1'"
      />
    </button>

    <div class="flex items-center space-x-2">
      <span
        class="text-sm font-medium transition-colors duration-200"
        :class="modelValue === 'annual' ? 'text-gray-900' : 'text-gray-500'"
      >
        Anual
      </span>
      <span
        class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full"
      >
        Ahorra hasta 33%
      </span>
    </div>
  </div>
</template>
