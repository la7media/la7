<script setup lang="ts">
useHead({ title: "La7 >> Iniciar Sesión" });
definePageMeta({ middleware: ["unauthenticated"] });
</script>

<template>
  <div
    class="flex items-center justify-center bg-gray-50 py-4 px-4 min-h-template"
  >
    <AuthLogin />
  </div>
</template>
