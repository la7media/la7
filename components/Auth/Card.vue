<script setup lang="ts">
const { user, isAdmin, isProvider } = useAuth();
</script>
<template>
  <div :class="$attrs.class">
    <div v-if="user" class="flex items-center space-x-2">
      <div v-if="isProvider() || isAdmin()">
        <AuthActiver />
      </div>
      <div v-else>
        <div
          v-if="user?.profile?.activations?.active"
          class="bg-green-700 rounded-full text-white text-xs p-1"
        >
          activo
        </div>
        <span v-else class="bg-gray-700 rounded-full text-white text-sm p-1"
          >Código:
          <b>{{ user?.profile?.activations?.activation_code }}</b></span
        >
      </div>
      <div
        class="hover:text-orange-600 font-bold transition-colors text-gray-800 text-sm md:text-lg md:font-semibold"
      >
        <AuthLogout><span class="text-sm">Salir</span></AuthLogout>
      </div>
    </div>
    <div
      v-else
      class="flex items-center space-x-4 text-gray-800 hover:text-orange-600 transition-colors"
    >
      <NuxtLink
        to="/login"
        class="flex items-center flex-col gap-1 text-lg md:text-xl"
        title="Iniciar sesión"
      >
        <IconsLogin />
        <span class="text-sm font-bold">Ingresar</span>
      </NuxtLink>
    </div>
  </div>
</template>
