<script setup lang="ts">
const { logout } = useAuth();
const manageLogout = async () => {
  await logout();
  useLike().filterLike.value = false;
  useLocation().reset();
};
</script>

<template>
  <button
    class="flex items-center flex-col gap-1 space-x-1 hover:scale-105 cursor-pointer"
    title="Cerrar sesión"
    @click="manageLogout"
  >
    <IconsLogout class="m-0" />
    <span class="text-sm">Salir</span>
  </button>
</template>
