<!-- pages/reset-password.vue -->
<script setup lang="ts">
import PasswordForm from "~/components/App/PasswordForm.vue";
import MessageAlert from "~/components/App/MessageAlert.vue";

useHead({ title: "La7 >> Restablecer contraseña" });

const router = useRouter();
const route = useRoute();
const { updatePassword } = useAuth();
const supabase = useSupabaseClient();

// Estados reactivos
const isLoading = ref(true);
const errorMessage = ref("");
const successMessage = ref("");
const isValidPasswordReset = ref(false);
const canSubmitForm = ref(false);
const currentPassword = ref("");

// Manejar el envío del formulario
const resetPassword = async () => {
  if (!canSubmitForm.value || !currentPassword.value) return;

  try {
    isLoading.value = true;
    errorMessage.value = "";

    const { error } = await updatePassword(currentPassword.value);

    if (error) throw error;

    successMessage.value = "¡Contraseña actualizada correctamente!";
  } catch (error) {
    const e = error as { message: string };
    console.error("Error actualizando contraseña:", error);
    errorMessage.value = e.message || "Error al actualizar la contraseña";
  } finally {
    isLoading.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};

// Escuchar cambios de sesión (por si el evento llega normalmente)
supabase.auth.onAuthStateChange(async (event: string) => {
  if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
    isValidPasswordReset.value = true;
    isLoading.value = false;
  }
});

// Procesar manualmente el código de recuperación si viene por URL
onMounted(async () => {
  const code = route.query.code as string;
  const user = useSupabaseUser();
  if (code) {
    isValidPasswordReset.value = true;
    isLoading.value = false;
  } else if (!user.value) {
    isLoading.value = false;
    errorMessage.value =
      "No se encontró ningún código de recuperación en la URL.";
  }
});

// Actualizar el estado de envío basado en el componente de contraseña
const updateCanSubmit = (value: boolean) => {
  canSubmitForm.value = value && !isLoading.value;
};

const updatePasswords = (value: string) => {
  currentPassword.value = value;
};
</script>

<template>
  <div
    class="flex items-center justify-center bg-gray-50 py-4 px-4 min-h-template"
  >
    <div>
      <AppTitle>
        Crea tu nueva
        <template #emphasis>contraseña</template>
        <template #description>Ingresa tu nueva contraseña segura</template>
      </AppTitle>

      <form
        v-if="isValidPasswordReset"
        class="space-y-6"
        @submit.prevent="resetPassword"
      >
        <!-- Mensajes de estado -->
        <MessageAlert
          v-if="errorMessage"
          type="error"
          :message="errorMessage"
        />
        <MessageAlert
          v-if="successMessage"
          type="success"
          :message="successMessage"
        />

        <!-- Formulario de contraseña -->
        <PasswordForm
          :disabled="isLoading || successMessage.length > 0"
          @update:can-submit="updateCanSubmit"
          @update:password="updatePasswords"
        />

        <!-- Botón de envío -->
        <AppButtonLoad
          :is-loading="isLoading"
          :success="successMessage != ''"
          :disabled="!canSubmitForm || successMessage != ''"
        >
          Actualizar contraseña
          <template #loading>actualizando contraseña...</template>
          <template #success>✓ contraseña actualizada...</template>
        </AppButtonLoad>

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

      <!-- Mostrar error si no hay código o si fue inválido -->
      <MessageAlert
        v-else-if="errorMessage"
        type="error"
        :message="errorMessage"
      />
    </div>
  </div>
</template>
