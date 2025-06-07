<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

useHead({ title: "La7 >> Recuperar password" });
definePageMeta({ middleware: ["unauthenticated"] });

const { errorMessage, resetPasswordRequest } = useAuth();
const isLoading = ref(false);
const email = ref("");
const message = ref("");
const isEmailSent = ref(false);
const countdown = ref(0);
const canResend = ref(true);

// Timer para el countdown
let countdownInterval: NodeJS.Timeout | null = null;

const startCountdown = () => {
  countdown.value = 60; // 60 segundos
  canResend.value = false;

  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval!);
      canResend.value = true;
    }
  }, 1000);
};

const resetPasswordManager = async () => {
  if (!canResend.value) return;

  isLoading.value = true;
  errorMessage.value = "";
  message.value = "";

  const { error, data } = await resetPasswordRequest(email.value);
  console.log(data);

  if (error) {
    // Manejo de errores más específico
    const errorM = error.message as string;
    if (errorM?.includes("User not found")) {
      errorMessage.value = "No existe una cuenta con este correo electrónico.";
    } else if (errorM?.includes("Email not confirmed")) {
      errorMessage.value =
        "Tu cuenta aún no ha sido verificada. Revisa tu correo.";
    } else if (errorM?.includes("rate limit")) {
      errorMessage.value =
        "Has hecho demasiadas solicitudes. Espera un momento.";
    } else {
      errorMessage.value =
        errorM || "Hubo un error al intentar enviar el email.";
    }
  } else {
    message.value =
      "Se te envió un email de recuperación. Revisa tu bandeja de entrada y spam.";
    isEmailSent.value = true;
    startCountdown();
  }

  isLoading.value = false;
};

const resendEmail = async () => {
  if (!canResend.value || !isEmailSent.value) return;
  await resetPasswordManager();
};

// Cleanup del interval cuando el componente se desmonte
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<template>
  <div
    class="flex items-center justify-center bg-gray-50 py-4 px-4 min-h-template"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Recuperar
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
            >Password</span
          >
        </h1>
        <p class="text-gray-600">
          Para recuperar tu password inserta el email a continuación
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="resetPasswordManager">
        <!-- Mensaje de error -->
        <div
          v-if="errorMessage"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
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
          v-if="message"
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
          {{ message }}
        </div>

        <div class="space-y-4">
          <div>
            <Label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </Label>
            <Input
              id="email"
              v-model="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="email"
              placeholder="user@email.com"
              required
              :disabled="isLoading"
            />
          </div>
        </div>

        <!-- Botón principal -->
        <Button
          v-if="!isEmailSent"
          type="submit"
          :disabled="isLoading || !email"
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
            Enviando correo...
          </span>
          <span v-else>Enviar email de recuperación</span>
        </Button>

        <!-- Sección después de enviar el email -->
        <div v-if="isEmailSent" class="space-y-4">
          <!-- Botón de reenvío -->
          <Button
            type="button"
            :disabled="!canResend || isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-200"
            @click="resendEmail"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-400"
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
              Reenviando...
            </span>
            <span v-else-if="!canResend"> Reenviar en {{ countdown }}s </span>
            <span v-else> Reenviar email </span>
          </Button>

          <!-- Instrucciones adicionales -->
          <div
            class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm"
          >
            <p class="font-medium mb-1">¿No recibes el email?</p>
            <ul class="text-xs space-y-1 ml-4 list-disc">
              <li>Revisa tu carpeta de spam o correo no deseado</li>
              <li>Verifica que el email sea correcto</li>
              <li>El email puede tardar unos minutos en llegar</li>
            </ul>
          </div>

          <!-- Link para volver al inicio -->
          <div class="text-center">
            <NuxtLink
              to="/login"
              class="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Volver al inicio de sesión
            </NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
