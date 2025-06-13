<script setup lang="ts">
import { ref } from "vue";
import { getCurrentLocation } from "~/lib/utils";
const { setCurrentLocation, activeLocation, disableLocation } = useLocation();

// Indicador de carga
const isLoading = ref(false);

const handleLocation = async () => {
  const geoPermission = await navigator.permissions.query({
    name: "geolocation",
  });

  if (activeLocation.value) {
    if (geoPermission.state === "granted") {
      await disableLocation(); // Usar la función del composable
      return;
    }
  }

  if (geoPermission.state === "denied") {
    alert(
      "La ubicación está desactivada. Por favor, activa la ubicación en la configuración del navegador."
    );
    return;
  }

  if (geoPermission.state === "prompt") {
    if (
      !confirm(
        "¿Deseas activar la ubicación actual? Esto permitirá mostrar los comercios cercanos."
      )
    ) {
      return;
    }
  }

  isLoading.value = true;
  try {
    const position = await getCurrentLocation();
    // Esperar a que se complete la operación de guardar
    await setCurrentLocation({
      lat: position?.coords.latitude ?? 0,
      lng: position?.coords.longitude ?? 0,
    });
    // activeLocation se activará automáticamente en setCurrentLocation
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    activeLocation.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <button
    :class="{
      'bg-gray-200 text-gray-800 hover:bg-blue-300': !activeLocation,
      'bg-blue-700 text-white hover:bg-blue-500': activeLocation,
      'opacity-80': isLoading,
    }"
    class="inline-flex items-center justify-center rounded-full transition-colors w-10 h-10"
    :disabled="isLoading"
    @click="handleLocation"
  >
    <div
      v-if="isLoading"
      class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"
    ></div>
    <IconsMapPin v-else />
  </button>
</template>
