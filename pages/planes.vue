<!-- pages/pricing.vue -->
<script setup lang="ts">
import PricingCard from "~/components/PricingCard.vue";
import BillingToggle from "~/components/BillingToggle.vue";
import CommunityInfo from "~/components/CommunityInfo.vue";

useHead({
  title: "La7 Media >> Precios y Planes",
  meta: [
    {
      name: "description",
      content:
        "Descubre nuestros planes diseñados para comercios, emprendedores y creadores de comunidad. Desde gratis hasta planes premium con todas las funcionalidades.",
    },
  ],
});

const { plans, communityInfo } = usePricing();
const billingCycle = ref<"monthly" | "annual">("monthly");

const faqData = [
  {
    question: "¿Qué incluye la inscripción flexible?",
    answer:
      "Puedes inscribirte con el valor que desees. Si tu aporte cubre algún plan, se aplicará automáticamente. Este valor te da prioridad en el feed de comercios y permanece mientras tengas tu cuenta activa.",
  },
  {
    question: "¿Cómo funcionan las redenciones de bonos?",
    answer:
      "Cada plan incluye un número específico de redenciones mensuales. Una vez alcanzado el límite, cada redención adicional tiene un costo de $100 COP que se factura al mes siguiente.",
  },
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí, puedes cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación.",
  },
  {
    question: "¿Qué es el patrocinio de eventos?",
    answer:
      "Los comercios pueden patrocinar eventos creados por la comunidad. Esto incluye crear bonos específicos para el evento, ser nombrados como patrocinadores y tener mayor visibilidad durante el evento.",
  },
  {
    question: "¿Cómo funciona el plan Creador?",
    answer:
      "Los creadores pueden crear y gestionar comunidades, establecer sus propios precios de afiliación, y recibir comisiones por los comercios que se unan a su comunidad. También tienen acceso al código fuente para personalizar su experiencia.",
  },
];

const expandedFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 lg:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Planes que Impulsan
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
            >
              tu Negocio
            </span>
          </h1>

          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Desde comercios gratuitos hasta comunidades completas. Elige el plan
            perfecto para hacer crecer tu presencia digital en La7 Media.
          </p>

          <!-- Billing Toggle -->
          <BillingToggle v-model="billingCycle" />
        </div>
      </div>
    </section>

    <!-- Community Info Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityInfo :info="communityInfo" />
      </div>
    </section>

    <!-- Pricing Cards Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Planes
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Diseñados para crecer contigo, desde tu primer comercio hasta
            comunidades completas
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          <PricingCard
            v-for="plan in plans"
            :key="plan.id"
            :plan="plan"
            :billing-cycle="billingCycle"
          />
        </div>

        <!-- Launch Promotion Banner -->
        <div
          class="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 class="text-2xl font-bold mb-4">🚀 ¡Oferta de Lanzamiento!</h3>
          <p class="text-lg mb-4">
            Aprovecha precios especiales en los planes Básico y Partner hasta el
            11 de julio
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <div class="bg-white/20 rounded-lg p-4">
              <div class="font-semibold">Plan Básico</div>
              <div class="text-sm opacity-90">$10,000/mes (antes $15,000)</div>
            </div>
            <div class="bg-white/20 rounded-lg p-4">
              <div class="font-semibold">Plan Partner</div>
              <div class="text-sm opacity-90">$30,000/mes (antes $80,000)</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Comparison Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comparación Detallada
          </h2>
          <p class="text-xl text-gray-600">
            Ve exactamente qué incluye cada plan
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    Características
                  </th>
                  <th
                    v-for="plan in plans"
                    :key="plan.id"
                    class="px-6 py-4 text-center text-sm font-semibold text-gray-900"
                  >
                    {{ plan.name }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">
                    Crear comercio
                  </td>
                  <td
                    v-for="plan in plans"
                    :key="`${plan.id}-create`"
                    class="px-6 py-4 text-center"
                  >
                    <svg
                      class="w-5 h-5 text-green-500 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </td>
                </tr>
                <!-- Puedes agregar más filas de comparación aquí -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p class="text-lg text-gray-600">
            Respuestas claras para que tomes la mejor decisión
          </p>
        </div>

        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqData"
            :key="index"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              class="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-medium focus:outline-none"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.question }}</span>
              <svg
                :class="{ 'transform rotate-180': expandedFaq === index }"
                class="w-5 h-5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div v-if="expandedFaq === index" class="px-6 pb-4 text-gray-700">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
