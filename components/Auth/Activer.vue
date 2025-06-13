<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
const open = ref(false);
const codigo = ref<number | undefined>();
const valor = ref(2000);

const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

const { user } = useAuth();
const { activeUser } = useActivator();

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (typeof codigo.value !== "number" || codigo.value <= 0) {
    errorMessage.value = "El código debe ser un número válido.";
    return;
  }

  if (valor.value < 2000) {
    errorMessage.value = "El valor debe ser mínimo 2000.";
    return;
  }

  isLoading.value = true;
  try {
    const { error } = await activeUser(
      codigo.value,
      valor.value,
      (user.value?.id as string) ?? null
    );
    if (error) {
      errorMessage.value = "Error al activar el usuario. Verifica el código.";
    } else {
      successMessage.value = "¡Usuario activado correctamente!";
      setTimeout(() => {
        open.value = false;
        codigo.value = undefined;
        valor.value = 2000;
        successMessage.value = "";
      }, 1500);
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = "Ha ocurrido un error inesperado.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <UiButton @click="open = true">Activar</UiButton>

    <div
      v-if="open"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click.self="open = false"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-xl font-semibold text-gray-900">Activar usuario</h2>
          <button
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            @click="open = false"
          >
            <IconsX class="w-5 h-5" />
          </button>
        </div>

        <form
          class="flex flex-col items-center gap-4 my-6"
          @submit.prevent="handleSubmit"
        >
          <AppMessageAlert
            v-if="errorMessage"
            type="error"
            :message="errorMessage"
          />
          <AppMessageAlert
            v-if="successMessage"
            type="success"
            :message="successMessage"
          />

          <div class="text-gray-600">Código del usuario</div>
          <UiInput
            v-model="codigo"
            type="number"
            class="max-w-40 text-center"
            placeholder="Ingresa el código"
            autofocus
          />

          <div class="text-gray-600">Valor pagado</div>
          <UiInput
            v-model="valor"
            type="number"
            class="max-w-40 text-center"
            placeholder="Mínimo 2000"
          />

          <UiButton :disabled="isLoading">
            <span v-if="!isLoading">Activar</span>
            <span v-else>Cargando...</span>
          </UiButton>
        </form>
      </div>
    </div>
  </div>
</template>
