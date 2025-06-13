<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const isLoading = ref(false);
const isDev = process.env.NODE_ENV === "development";
const token = ref(isDev ? "development-token" : "");
const { login, errorMessage, loginParams } = useAuth();

const loginManage = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  // En desarrollo, simula que siempre hay token
  const currentToken = isDev ? "development-token" : token.value;

  if (!currentToken) {
    errorMessage.value = "No se validó el captcha.";
    return;
  }

  try {
    const res = await login(token.value);
    if (!res?.error) {
      useLocation().reset();
      navigateTo("/directorio");
    }
  } catch (err) {
    errorMessage.value =
      "Error de conexión. Verifica tu internet e intenta nuevamente." +
      (err instanceof Error ? ` Detalles: ${err.message}` : "");
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="max-w-md w-full space-y-8">
    <AppTitle>
      Iniciar
      <template #emphasis>sesión</template>
      <template #description
        >Ingresa tus credenciales para acceder a tu cuenta</template
      >
    </AppTitle>

    <form class="mt-8 space-y-6" @submit.prevent="loginManage">
      <!-- Mensaje de error -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
      >
        {{ errorMessage }}
      </div>

      <div class="space-y-4">
        <div>
          <Label
            for="phone"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Celular o correo
          </Label>
          <Input
            id="phone"
            v-model="loginParams.phone"
            type="phone"
            placeholder="user@email.com | 3001234567"
            required
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <Label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </Label>
            <a
              href="/recuperar-password"
              class="text-sm text-blue-600 hover:text-blue-500 underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <PasswordInput
            id="password"
            v-model="loginParams.password"
            placeholder="••••••••"
            required
            :disabled="isLoading"
          />
        </div>
        <div class="h-9">
          <NuxtTurnstile v-model="token" />
        </div>
      </div>

      <Button
        type="submit"
        :disabled="isLoading || token == ''"
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
          Iniciando sesión...
        </span>
        <span v-else>Iniciar Sesión</span>
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes una cuenta?
          <NuxtLink
            class="font-medium text-blue-600 hover:text-blue-500 underline"
            to="/registro"
          >
            Regístrate aquí
          </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>
