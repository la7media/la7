<script setup lang="ts">
const comerceForm = useFormComerce();
const { show: showForm, resetForm, form, editingComercio } = comerceForm;

const emit = defineEmits([
  "abrir-form",
  "cerrar-form",
  "add-comercio",
  "update-comercio",
]);

const loading = ref(false);
const imageInput = ref<HTMLInputElement | null>(null);

const { uploadComercePhoto, saveComerce, loadFormComerce, updateComerce } =
  useComercios();

// Evento para emitir al padre que debe cambiar el valor de showForm

const guardarComercio = async () => {
  loading.value = true;
  const nuevoComercio = loadFormComerce(form.value);
  try {
    if (imageInput.value?.files?.length) {
      nuevoComercio.image =
        (await uploadComercePhoto(
          imageInput.value,
          nuevoComercio.slug ?? ""
        )) ?? "";
    }
    if (editingComercio.value) {
      await updateComerce(nuevoComercio, editingComercio.value);
      emit("update-comercio", nuevoComercio);
    } else {
      await saveComerce(nuevoComercio);
      emit("add-comercio", nuevoComercio);
    }

    showForm.value = false;
    resetForm();
  } catch (error) {
    console.error("Error al guardar comercio:", error);
  } finally {
    loading.value = false;
  }
};

const cerrarFormulario = () => {
  if (confirm("¿Seguro desea cerrar el formulario? Se perderán los cambios.")) {
    emit("cerrar-form", false);
    showForm.value = false;
  }
};
</script>
<template>
  <div
    v-if="showForm"
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    @click.self="cerrarFormulario"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ editingComercio ? "Editar Comercio" : "Nuevo Comercio" }}
        </h2>
        <button
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          @click="cerrarFormulario"
        >
          <IconsX class="w-5 h-5" />
        </button>
      </div>

      <form class="p-6 space-y-6" @submit.prevent="guardarComercio">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Comercio *
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Valor suscripción *
          </label>
          <input
            v-model="form.suscripcion_value"
            type="number"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            URL de la Imagen *
          </label>
          <input
            ref="imageInput"
            type="file"
            :required="!editingComercio"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="/imagen.jpg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Categorías</label
          >
          <ComerceCategoriaSelector v-model="form.categorias" />
        </div>

        <!-- Ubicación -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ubicación *
          </label>
          <input
            v-model="form.ubicacion"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Centro Histórico, Calle Principal 123"
          />
        </div>
        <LocationPicker v-model="form.location" required />

        <!-- Descripción -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe el comercio, sus productos o servicios..."
          ></textarea>
        </div>

        <!-- WhatsApp -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp
          </label>
          <input
            v-model="form.whatsapp"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1234567890"
          />
        </div>

        <!-- Instagram -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Instagram
          </label>
          <input
            v-model="form.instagram"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="@usuario o https://instagram.com/usuario"
          />
        </div>

        <!-- Botones -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            @click="showForm = false"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <IconsSave class="w-4 h-4 mr-2" />
            {{ loading ? "Guardando..." : "Guardar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
