// composables/usePasswordValidation.ts
export const usePasswordValidation = () => {
  const password = ref("");
  const confirmPassword = ref("");

  // Validaciones de contraseña
  const passwordErrors = computed(() => {
    const errors = [];
    if (password.value && password.value.length < 6) {
      errors.push("Mínimo 6 caracteres");
    }
    if (password.value && !/(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
      errors.push("Debe contener mayúsculas y minúsculas");
    }
    if (password.value && !/(?=.*\d)/.test(password.value)) {
      errors.push("Debe contener al menos un número");
    }
    return errors;
  });

  // Verificar si las contraseñas coinciden
  const passwordsMatch = computed(() => {
    return password.value === confirmPassword.value;
  });

  // Verificar si la contraseña es válida
  const isPasswordValid = computed(() => {
    return password.value && passwordErrors.value.length === 0;
  });

  // Verificar si se puede enviar el formulario
  const canSubmit = computed(() => {
    return (
      password.value &&
      confirmPassword.value &&
      passwordErrors.value.length === 0 &&
      passwordsMatch.value
    );
  });

  // Calcular la fortaleza de la contraseña (0-3)
  const passwordStrength = computed(() => {
    if (!password.value) return 0;

    let strength = 0;
    if (password.value.length >= 8) strength++;
    if (passwordErrors.value.length <= 1) strength++;
    if (passwordErrors.value.length === 0) strength++;

    return strength;
  });

  // Resetear valores
  const resetPasswords = () => {
    password.value = "";
    confirmPassword.value = "";
  };

  return {
    password,
    confirmPassword,
    passwordErrors,
    passwordsMatch,
    isPasswordValid,
    canSubmit,
    passwordStrength,
    resetPasswords,
  };
};
