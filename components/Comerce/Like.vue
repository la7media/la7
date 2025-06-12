<script setup lang="ts">
import { ref } from "vue";

const { user } = useAuth();
const { likeComerce, unlikeComerce } = useComercios();

const props = defineProps<{
  liked: boolean;
  comercioId: number;
}>();

// Emitir eventos para actualizar el estado del componente padre
const emit = defineEmits<{
  liked: [comercioId: number];
  unliked: [comercioId: number];
}>();

// Estado local para manejar el loading y el estado del like
const isLoading = ref(false);
const isLiked = ref(props.liked);

const handleLikeComerce = async (id: number) => {
  if (!user.value) {
    const ok = confirm(
      "Debes iniciar sesión para dar like a un comercio. ¿Deseas iniciar sesión ahora?"
    );
    if (ok) {
      useRouter().push("/login");
    }
    return;
  }

  if (isLoading.value) return; // Prevenir clics múltiples

  isLoading.value = true;

  try {
    if (isLiked.value) {
      // Si ya tiene like, quitarlo
      const success = await unlikeComerce(id, user.value.id as string);
      if (success !== false) {
        // unlikeComerce no retorna true, solo false en error
        isLiked.value = false;
        emit("unliked", id);
      }
    } else {
      // Si no tiene like, agregarlo
      const success = await likeComerce(id, user.value.id as string);
      if (success) {
        isLiked.value = true;
        emit("liked", id);
      }
    }
  } catch (error) {
    console.error("Error manejando like:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <button
    :class="{
      'opacity-80': isLoading,
      'cursor-pointer': !isLoading,
    }"
    class="text-sm w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center"
    :disabled="isLoading"
    @click="handleLikeComerce(comercioId)"
  >
    <div
      v-if="isLoading"
      class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"
    ></div>
    <IconsLiked v-else-if="isLiked" class="text-red-600" />
    <IconsLike v-else />
  </button>
</template>
