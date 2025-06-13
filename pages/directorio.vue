<script setup>
import { watch, onMounted } from "vue";
import { ComerceForm } from "#components";

// Composables
const { show: showForm } = useFormComerce();
const { loadComercios } = useComercios();
const { currentLocation, locationKey, activeLocation } = useLocation();
const { categoriasFilter, allCoincidence } = useCategoria();
const { filterLike } = useLike();
const { user } = useAuth();
// Estados locales

// Función adaptador para el composable
const loadComerciosAdapter = async (page, pageSize, categorias) => {
  const result = await loadComercios(
    categorias,
    page,
    pageSize,
    activeLocation.value ? locationKey.value : null,
    activeLocation.value ? currentLocation : null,
    filterLike.value,
    allCoincidence.value
  );
  return {
    items: result.comercios,
    hasMore: result.hasMore,
    total: result.total,
  };
};

// Usar el composable de scroll infinito
const {
  items: comercios,
  loading,
  loadingMore,
  hasMore,
  totalItems: totalComercios,
  loadItems,
  loadMore,
  reset,
} = useInfiniteScroll(loadComerciosAdapter, {
  pageSize: 6,
  debounceTime: 1200,
});

// Funciones
const abrirFormulario = () => {
  showForm.value = true;
};

const handleAddComercio = () => {
  abrirFormulario();
};

const handleLoadMore = () => {
  loadMore(categoriasFilter.value);
};

const recargarComercios = () => {
  loadItems(true, categoriasFilter.value);
};

// Watchers

watch(
  activeLocation,
  async (newValue, oldValue) => {
    // Solo recargar si realmente cambió el estado
    if (newValue !== oldValue) {
      // Si se activó la ubicación, dar un pequeño delay para asegurar
      // que la operación de guardado se completó
      if (newValue) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      recargarComercios();
    }
  },
  { deep: true }
);

watch(
  categoriasFilter,
  () => {
    reset(categoriasFilter.value);
  },
  { deep: true }
);

watch(
  allCoincidence,
  () => {
    if (categoriasFilter.value.length > 0) {
      reset(categoriasFilter.value);
    }
  },
  { deep: true }
);
watch(
  filterLike,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      if (newValue) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      recargarComercios();
    }
  },
  { deep: true }
);

// Lifecycle
onMounted(() => {
  loadItems(true, categoriasFilter.value);
});

// SEO
useHead({ title: "La7 >> Directorio" });
</script>

<template>
  <ContainerApp>
    <!-- Header con filtros -->
    <DirectoryHeader
      v-model:categorias-filter="categoriasFilter"
      :user="user"
      @add-comercio="handleAddComercio"
    />

    <!-- Grid de comercios -->
    <DirectoryGrid
      :comercios="comercios"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more="hasMore"
      :total-comercios="totalComercios"
      :user="user"
      :categorias-filter="categoriasFilter"
      @load-more="handleLoadMore"
      @add-comercio="handleAddComercio"
      @delete-comercio="recargarComercios"
    />

    <!-- Modal del formulario -->
    <ComerceForm
      v-if="user"
      @add-comercio="recargarComercios"
      @update-comercio="recargarComercios"
    />
  </ContainerApp>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
