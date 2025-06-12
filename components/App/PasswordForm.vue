<!-- components/PasswordForm.vue -->
<script setup lang="ts">
import { Label } from "~/components/ui/label";
import PasswordInput from "~/components/PasswordInput.vue";

interface Props {
  disabled?: boolean;
  showStrengthIndicator?: boolean;
  newPasswordLabel?: string;
  confirmPasswordLabel?: string;
}

const {
  disabled,
  showStrengthIndicator,
  newPasswordLabel,
  confirmPasswordLabel,
} = withDefaults(defineProps<Props>(), {
  disabled: false,
  showStrengthIndicator: true,
  newPasswordLabel: "Nueva contraseña",
  confirmPasswordLabel: "Confirmar contraseña",
});

const emit = defineEmits<{
  "update:canSubmit": [value: boolean];
  "update:password": [value: string];
  "update:confirmPassword": [value: string];
}>();

const {
  password,
  confirmPassword,
  passwordErrors,
  passwordsMatch,
  canSubmit,
  passwordStrength,
} = usePasswordValidation();

// Emitir cambios hacia el componente padre
watch(canSubmit, (value) => {
  emit("update:canSubmit", value as boolean);
});

watch(password, (value) => {
  emit("update:password", value);
});

watch(confirmPassword, (value) => {
  emit("update:confirmPassword", value);
});
</script>

<template>
  <div class="space-y-4">
    <!-- Nueva contraseña -->
    <div>
      <Label
        for="password"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ newPasswordLabel }}
      </Label>
      <PasswordInput
        id="password"
        v-model="password"
        placeholder="••••••••"
        required
        :disabled="disabled"
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
        {{ confirmPasswordLabel }}
      </Label>
      <PasswordInput
        id="confirmPassword"
        v-model="confirmPassword"
        placeholder="••••••••"
        required
        :disabled="disabled"
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

    <!-- Indicadores de fortaleza -->
    <div v-if="password && showStrengthIndicator" class="space-y-2">
      <div class="text-xs font-medium text-gray-700">
        Fortaleza de la contraseña:
      </div>
      <div class="flex space-x-1">
        <div
          v-for="i in 3"
          :key="i"
          class="h-2 flex-1 rounded-full transition-colors duration-200"
          :class="passwordStrength >= i ? 'bg-green-400' : 'bg-gray-200'"
        />
      </div>
    </div>
  </div>
</template>
