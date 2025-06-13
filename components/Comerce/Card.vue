<script setup lang="ts">
import type { Comercio } from "~/lib/interfaces/comercio";

const supabase = useSupabaseClient();
const { deleteComerce } = useComercios();
const { isAdmin } = useAuth();
const { comercio } = defineProps<{
  comercio: Comercio;
}>();

const emits = defineEmits(["delete-comercio"]);

const {
  data: { publicUrl: image },
} = supabase.storage.from("comercios").getPublicUrl(comercio.image);
const formatearWhatsApp = (numero: string) => {
  return numero ? `https://wa.me/${numero.replace(/[^0-9]/g, "")}` : "";
};

const formatearInstagram = (usuario: string) => {
  return usuario ? `https://instagram.com/${usuario.replace("@", "")}` : "";
};

const editComercio = (comercio: Comercio) => {
  const comerceF = useFormComerce();
  comerceF.show.value = true;
  comerceF.editingComercio.value = comercio.id;
  comerceF.loadFormComerce(comercio, comercio.id);
};

const handleDeleteComerce = async (comercio: Comercio) => {
  const ok = confirm(
    "¿Estás seguro de que quieres eliminar este comercio? Esta acción no se puede deshacer."
  );
  if (!ok) return;
  await deleteComerce(comercio);
  emits("delete-comercio");
};

const distance = computed(() => {
  const distance = Math.round((comercio.distance ?? 1000) * 1000);
  if (distance < 120) return ` < 120 mt`;
  if (distance < 1000) return `${distance} mt`;
  return Math.round(distance / 1000) + " km";
});
</script>
<template>
  <div class="">
    <!-- Imagen -->
    <div class="w-full flex justify-center">
      <div class="rounded-t-2xl overflow-hidden inline-block m-auto relative">
        <div class="absolute top-0 right-0 flex space-x-2 p-2">
          <button
            v-if="isAdmin()"
            class="cursor-pointer text-sm w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center"
            @click="handleDeleteComerce(comercio)"
          >
            <IconsDelete />
          </button>
          <button
            v-if="isAdmin()"
            class="cursor-pointer text-sm w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center"
            @click="editComercio(comercio)"
          >
            <IconsEdit />
          </button>
          <ComerceLike
            :comercio-id="comercio.id"
            :liked="comercio.liked ?? false"
          />
        </div>
        <img :src="image" :alt="comercio.name" class="h-72 object-cover" />
      </div>
    </div>

    <!-- Contenido -->
    <div
      class="p-6 bg-white hover:shadow-xl transition-shadow shadow-md rounded-b flex justify-between flex-col z-10"
      style="height: calc(100% - 288px)"
    >
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{ comercio.name }}
          <span v-if="comercio.distance" class="text-sm text-gray-600 ml-2"
            >a {{ distance }}</span
          >
        </h3>

        <div class="">
          <a
            class="flex items-center gap-1 text-orange-600 mb-3"
            target="_blank"
            :href="`https://maps.google.com/?q=${comercio.location.lat},${comercio.location.lng}`"
          >
            <IconsMapPin class="w-6 sh-6 mt-1 mr-2 flex-shrink-0" />
            <span class="text-sm">{{ comercio.ubicacion }}</span>
          </a>
        </div>

        <p
          v-if="comercio.description"
          class="text-gray-700 text-sm mb-4 line-clamp-3"
        >
          {{ comercio.description }}
        </p>
      </div>

      <!-- Enlaces sociales -->
      <div>
        <div class="flex gap-3">
          <a
            v-if="comercio.whatsapp"
            :href="formatearWhatsApp(comercio.whatsapp)"
            target="_blank"
            class="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
          >
            <IconsPhone class="w-4 h-4 mr-1" />
            WhatsApp
          </a>
          <a
            v-if="comercio.instagram"
            :href="formatearInstagram(comercio.instagram)"
            target="_blank"
            class="inline-flex items-center px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm"
          >
            <IconsInstagram class="w-4 h-4 mr-1" />
            Instagram
          </a>
        </div>
        <div class="flex flex-wrap gap-1 mt-2 w-full overflow-hidden">
          <span
            v-for="categoria in comercio.categorias"
            :key="categoria"
            class="p-1 text-[0.60rem] border-gray-200 border bg-gray-100 rounded-full text-gray-800"
          >
            #{{ categoria }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
