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
    <ClientOnly>
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
    </ClientOnly>

    <!-- Header con título y filtros -->
    <div class="px-0 py-4 sm:px-4 mb-2">
      <div class="flex flex-row justify-between items-center gap-4">
        <AppTitle align="left">
          Directorio
          <template #emphasis>comercial</template>
          <template #description
            >Descubre los comercios de la comunidad</template
          >
        </AppTitle>

        <!-- Filtros -->
        <div class="flex items-center gap-2">
          <ClientOnly>
            <DirectoryLiked v-if="auth.user.value" />
            <DirectoryLocation />
            <DirectoryCategoria />
            <template #fallback>
              <div class="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div class="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div class="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
