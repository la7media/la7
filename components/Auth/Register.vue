<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const isLoading = ref(false);
const auth = useAuth();
const { register } = auth;
const errorMessage = ref("");
const successMessage = ref("");

const registerParams = ref({
  email: "",
  password: "",
  confirmPassword: "",
  nombre: "",
  celular: "",
  direccion: "",
  type: "comunitario" as "comunitario" | "empresa" | "admin",
});

const registerManage = async () => {
  if (isLoading.value) return;

  // Validaciones básicas
  if (registerParams.value.password !== registerParams.value.confirmPassword) {
    errorMessage.value = "Las contraseñas no coinciden";
    return;
  }

  if (registerParams.value.password.length < 6) {
    errorMessage.value = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  if (!registerParams.value.nombre.trim()) {
    errorMessage.value = "El nombre es requerido";
    return;
  }

  if (!registerParams.value.celular.trim()) {
    errorMessage.value = "El celular es requerido";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const { error } = await register(registerParams.value);
    if (!error) {
      successMessage.value =
        "Cuenta creada exitosamente. Revisa tu correo para confirmar tu cuenta.";
      // Opcional: redirigir después de unos segundos
      setTimeout(() => {
        navigateTo("/login");
      }, 3000);
    }
  } catch (err) {
    errorMessage.value =
      "Error al crear la cuenta. Intenta nuevamente." +
      (err instanceof Error ? ` Detalles: ${err.message}` : "");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-xl w-full space-y-8 m-auto">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        Crear
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
          >Cuenta</span
        >
      </h1>
      <p class="text-gray-600">
        Completa los siguientes datos para registrarte
      </p>
    </div>

    <form class="mt-8 space-y-6" @submit.prevent="registerManage">
      <!-- Mensaje de error -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
      >
        {{ errorMessage }}
      </div>

      <!-- Mensaje de éxito -->
      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
      >
        {{ successMessage }}
      </div>

      <div class="space-y-4">
        <!-- Nombre -->
        <div>
          <Label
            for="nombre"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre Completo *
          </Label>
          <Input
            id="nombre"
            v-model="registerParams.nombre"
            type="text"
            placeholder="Tu nombre completo"
            required
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <!-- Celular -->
        <div>
          <Label
            for="celular"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Celular *
          </Label>
          <Input
            id="celular"
            v-model="registerParams.celular"
            type="tel"
            placeholder="3001234567 (celular colombia)"
            required
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <!-- Password -->
        <div>
          <Label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña *
          </Label>
          <Input
            id="password"
            v-model="registerParams.password"
            type="password"
            placeholder="••••••••"
            required
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <Label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmar Contraseña *
          </Label>
          <Input
            id="confirmPassword"
            v-model="registerParams.confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <Button
        type="submit"
        :disabled="isLoading"
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
          Creando cuenta...
        </span>
        <span v-else>Crear Cuenta</span>
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          ¿Ya tienes una cuenta?
          <NuxtLink
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500 underline"
          >
            Inicia sesión aquí
          </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>
