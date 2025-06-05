<script setup>
const auth = useAuth();
const { show: showForm, resetForm } = useFormComerce();
const createComerce = () => {
  resetForm();
  showForm.value = true;
};
</script>

<template>
  <div>
    <!-- Botón agregar comercio -->
    <div class="flex justify-end">
      <button
        v-if="auth.isAdmin()"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="createComerce"
      >
        <IconsPlus class="w-5 h-5 mr-2" />
        Agregar Comercio
      </button>
    </div>

    <!-- Header con título y filtros -->
    <div class="px-0 py-4 sm:px-4 mb-2">
      <div class="flex flex-row justify-between items-center gap-4">
        <div>
          <h1 class="text-lg md:text-3xl font-bold text-gray-900 mb-1">
            Directorio
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
            >
              Comercial
            </span>
          </h1>
          <p class="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            Descubre los comercios de la comunidad.
          </p>
        </div>

        <!-- Filtros -->
        <div class="flex items-center gap-2">
          <DirectoryLiked v-if="auth.user" />
          <DirectoryLocation />
          <DirectoryCategoria />
        </div>
      </div>
    </div>
  </div>
</template>
