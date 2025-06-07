<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- pages/reset-password.vue -->
<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import PasswordInput from "~/components/PasswordInput.vue"; // Tu componente de password

useHead({ title: "La7 >> Restablecer contraseña" });
definePageMeta({ middleware: ["unauthenticated"] });

const route = useRoute();
const router = useRouter();
const { updatePassword } = useAuth();

// Estados reactivos
const isLoading = ref(false);
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const isValidToken = ref(false);
const isCheckingToken = ref(true);

// Validaciones
const passwordErrors = computed(() => {
  const errors = [];
  if (password.value && password.value.length < 8) {
    errors.push("Mínimo 8 caracteres");
  }
  if (password.value && !/(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
    errors.push("Debe contener mayúsculas y minúsculas");
  }
  if (password.value && !/(?=.*\d)/.test(password.value)) {
    errors.push("Debe contener al menos un número");
  }
  return errors;
});

const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value;
});

const canSubmit = computed(() => {
  return (
    password.value &&
    confirmPassword.value &&
    passwordErrors.value.length === 0 &&
    passwordsMatch.value &&
    !isLoading.value
  );
});

// Verificar token al montar el componente
onMounted(async () => {
  await checkTokenValidity();
});

const checkTokenValidity = async () => {
  isValidToken.value = true;
  isCheckingToken.value = false;
  return true;

  try {
    isCheckingToken.value = true;

    // Obtener los parámetros de la URL
    const access_token = route.query.access_token as string;
    const refresh_token = route.query.refresh_token as string;
    const type = route.query.type as string;
    const supabase = useSupabaseClient();

    console.log("URL params:", { access_token, refresh_token, type });

    if (!access_token || !refresh_token || type !== "recovery") {
      throw new Error("Token de recuperación inválido o expirado");
    }

    // Establecer la sesión con los tokens
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      isValidToken.value = true;
      console.log("Token válido, usuario:", data.user?.email);
    } else {
      throw new Error("No se pudo verificar el usuario");
    }
  } catch (error: any) {
    console.error("Error verificando token:", error);
    errorMessage.value =
      error.message || "El enlace de recuperación es inválido o ha expirado";
    isValidToken.value = false;
  } finally {
    isCheckingToken.value = false;
  }
};

const resetPassword = async () => {
  if (!canSubmit.value) return;

  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Actualizar la contraseña
    const { error } = await updatePassword(password.value);

    if (error) {
      throw error;
    }

    successMessage.value = "¡Contraseña actualizada correctamente!";

    // Cerrar sesión para que el usuario inicie sesión con la nueva contraseña
  } catch (error: any) {
    console.error("Error actualizando contraseña:", error);
    errorMessage.value = error.message || "Error al actualizar la contraseña";
  } finally {
    isLoading.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div
    class="flex items-center justify-center bg-gray-50 py-4 px-4 min-h-template"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Loading inicial -->
      <div v-if="isCheckingToken" class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Verificando enlace de recuperación...</p>
      </div>

      <!-- Token inválido -->
      <div v-else-if="!isValidToken" class="text-center space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Enlace inválido</h1>
          <p class="text-gray-600">
            El enlace de recuperación es inválido o ha expirado
          </p>
        </div>

        <div
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start"
        >
          <svg
            class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ errorMessage }}
        </div>

        <Button
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
          @click="goToLogin"
        >
          Volver al inicio de sesión
        </Button>
      </div>

      <!-- Formulario de nueva contraseña -->
      <div v-else>
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            Nueva
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
            >
              Contraseña
            </span>
          </h1>
          <p class="text-gray-600">Ingresa tu nueva contraseña segura</p>
        </div>

        <form class="space-y-6" @submit.prevent="resetPassword">
          <!-- Mensaje de error -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start"
          >
            <svg
              class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ errorMessage }}
          </div>

          <!-- Mensaje de éxito -->
          <div
            v-if="successMessage"
            class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-start"
          >
            <svg
              class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ successMessage }}
          </div>

          <div class="space-y-4">
            <!-- Nueva contraseña -->
            <div>
              <Label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Nueva contraseña
              </Label>
              <PasswordInput
                id="password"
                v-model="password"
                placeholder="••••••••"
                required
                :disabled="isLoading || successMessage.length > 0"
              />

              <!-- Validaciones de contraseña -->
              <div
                v-if="password && passwordErrors.length > 0"
                class="mt-1 text-xs text-red-600"
              >
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="error in passwordErrors" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Confirmar contraseña -->
            <div>
              <Label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar contraseña
              </Label>
              <PasswordInput
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="••••••••"
                required
                :disabled="isLoading || successMessage.length > 0"
              />

              <!-- Validación de coincidencia -->
              <div
                v-if="confirmPassword && !passwordsMatch"
                class="mt-1 text-xs text-red-600"
              >
                Las contraseñas no coinciden
              </div>
              <div
                v-if="confirmPassword && passwordsMatch"
                class="mt-1 text-xs text-green-600"
              >
                ✓ Las contraseñas coinciden
              </div>
            </div>
          </div>

          <!-- Indicadores de fortaleza -->
          <div v-if="password" class="space-y-2">
            <div class="text-xs font-medium text-gray-700">
              Fortaleza de la contraseña:
            </div>
            <div class="flex space-x-1">
              <div
                class="h-2 flex-1 rounded-full"
                :class="password.length >= 8 ? 'bg-green-400' : 'bg-gray-200'"
              ></div>
              <div
                class="h-2 flex-1 rounded-full"
                :class="
                  passwordErrors.length <= 1 ? 'bg-green-400' : 'bg-gray-200'
                "
              ></div>
              <div
                class="h-2 flex-1 rounded-full"
                :class="
                  passwordErrors.length === 0 ? 'bg-green-400' : 'bg-gray-200'
                "
              ></div>
            </div>
          </div>

          <!-- Botón de envío -->
          <Button
            type="submit"
            :disabled="!canSubmit || successMessage"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Actualizando contraseña...
            </span>
            <span v-else-if="successMessage"> ✓ Contraseña actualizada </span>
            <span v-else> Actualizar contraseña </span>
          </Button>

          <!-- Link para cancelar -->
          <div v-if="!successMessage" class="text-center">
            <button
              type="button"
              class="text-sm text-gray-600 hover:text-gray-500 font-medium"
              @click="goToLogin"
            >
              Cancelar y volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
