<!-- components/PricingCard.vue -->
<script setup lang="ts">
import type { Plan } from "~/composables/usePricing";

interface Props {
  plan: Plan;
  billingCycle: "monthly" | "annual";
}

const props = defineProps<Props>();

const { formatPrice, getAnnualDiscount, isLaunchPriceActive } = usePricing();

const currentPrice = computed(() => {
  const { plan, billingCycle } = props;

  // Verificar si hay precio de lanzamiento activo
  if (plan.price.launchPrice && isLaunchPriceActive(plan)) {
    return plan.price.launchPrice.monthly;
  }

  if (billingCycle === "annual" && plan.price.annual) {
    return Math.round(plan.price.annual / 12);
  }

  return plan.price.monthly;
});

const originalPrice = computed(() => {
  return props.billingCycle === "annual" && props.plan.price.annual
    ? props.plan.price.monthly
    : null;
});

const annualSavings = computed(() => {
  if (props.billingCycle === "annual" && props.plan.price.annual) {
    return getAnnualDiscount(props.plan.price.monthly, props.plan.price.annual);
  }
  return 0;
});

const buttonClasses = computed(() => {
  const base =
    "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105";

  switch (props.plan.cta.variant) {
    case "primary":
      return `${base} bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl`;
    case "gradient":
      return `${base} bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-xl`;
    case "secondary":
    default:
      return `${base} border-2 border-orange-600 text-orange-600 hover:bg-orange-50`;
  }
});
</script>

<template>
  <div
    class="relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
    :class="[plan.popular ? 'ring-2 ring-orange-500 scale-105' : '', 'p-8']"
  >
    <!-- Badge -->
    <div
      v-if="plan.badge || plan.popular"
      class="flex justify-between items-start mb-4"
    >
      <span
        v-if="plan.badge"
        class="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
      >
        {{ plan.badge }}
      </span>
      <span
        v-if="plan.popular"
        class="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full ml-auto"
      >
        Más Popular
      </span>
    </div>

    <!-- Plan Header -->
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
      <p class="text-gray-600 mb-4">{{ plan.description }}</p>

      <!-- Pricing -->
      <div class="mb-4">
        <div
          v-if="
            plan.price.inscription !== 'Gratis' &&
            plan.price.inscription !== 'Variable'
          "
        >
          <span class="text-sm text-gray-500">Inscripción: </span>
          <span class="text-lg font-semibold text-gray-900">
            {{ formatPrice(plan.price.inscription as number) }}
          </span>
        </div>
        <div v-else-if="plan.price.inscription === 'Variable'">
          <span class="text-lg font-semibold text-orange-600"
            >Inscripción Variable</span
          >
        </div>

        <div class="mt-2">
          <div v-if="currentPrice === 0">
            <span class="text-4xl font-bold text-gray-900">Gratis</span>
          </div>
          <div v-else class="flex items-baseline justify-center">
            <span
              v-if="originalPrice"
              class="text-lg text-gray-400 line-through mr-2"
            >
              {{ formatPrice(originalPrice) }}
            </span>
            <span class="text-4xl font-bold text-gray-900">
              {{ formatPrice(currentPrice) }}
            </span>
            <span class="text-gray-600 ml-1">/mes</span>
          </div>

          <!-- Launch Price Badge -->
          <div
            v-if="plan.price.launchPrice && isLaunchPriceActive(plan)"
            class="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full mt-2"
          >
            ¡Hasta {{ plan.price.launchPrice.validUntil }}!
          </div>

          <!-- Annual Savings -->
          <div
            v-if="annualSavings > 0"
            class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mt-2"
          >
            Ahorra {{ annualSavings }}%
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <ul class="space-y-3 mb-8">
      <li
        v-for="(feature, index) in plan.features"
        :key="index"
        class="flex items-start"
      >
        <svg
          class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
          :class="feature.included ? 'text-green-500' : 'text-gray-300'"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            v-if="feature.included"
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
          <path
            v-else
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span
          class="text-sm"
          :class="[
            feature.included ? 'text-gray-700' : 'text-gray-400',
            feature.highlight ? 'font-semibold text-orange-600' : '',
          ]"
        >
          {{ feature.text }}
        </span>
      </li>
    </ul>

    <!-- CTA Button -->
    <button :class="buttonClasses">
      {{ plan.cta.text }}
    </button>
  </div>
</template>
