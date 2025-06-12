export default defineNuxtPlugin(async () => {
  const { initializeAuth } = useAuth();
  // Pequeño delay para asegurar que Supabase esté listo
  await nextTick();
  await initializeAuth();
});
