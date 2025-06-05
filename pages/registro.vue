<script setup lang="ts">
import { AuthRegister } from "#components";

useHead({ title: "La7 >> Registro" });
definePageMeta({ middleware: ["unauthenticated"] });
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <AuthRegister />
  </div>
</template>
