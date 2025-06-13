import { useLocalStorage } from "@vueuse/core";

export const useLocation = () => {
  const activeLocation = useLocalStorage("activeLocation", false);
  const currentLocation = useLocalStorage("currentLocation", {
    lat: 0,
    lng: 0,
  });
  const supabase = useSupabaseClient();
  const { user } = useAuth();

  // Usa LocalStorage y genera solo si no existe
  const getKey = (): string => {
    // Si hay usuario, usa su id; si no, genera uno random
    return user.value ? (user.value.id as string) : crypto.randomUUID();
  };
  const locationKey = useLocalStorage<string>("locationKey", getKey());

  const disableLocation = async () => {
    activeLocation.value = false;
    const { error } = await supabase
      .from("locations")
      .update({ active: false } as never)
      .eq("key", locationKey.value);
    if (error) {
      console.error("Error desactivando ubicación:", error);
      alert("No se pudo desactivar la ubicación.");
    }
  };

  const setCurrentLocation = async (location: { lat: number; lng: number }) => {
    currentLocation.value = location;

    const isTemp = !user.value;
    // Usa la locationKey del storage
    const key = user.value ? user.value.id : locationKey.value;

    const { error } = await supabase.from("locations").upsert(
      {
        key: key,
        location: location,
        active: true,
        temp: isTemp,
      } as never,
      { onConflict: "key" }
    );

    if (error) {
      console.error("Error guardando ubicación:", error);
      alert("No se pudo guardar tu ubicación.");
      throw error; // Lanzar el error para que el componente lo maneje
    } else {
      // Solo activar después de que se guarde exitosamente
      activeLocation.value = true;
    }
  };

  const reset = () => {
    locationKey.value = getKey();
    activeLocation.value = false;
  };

  return {
    reset,
    getKey,
    activeLocation,
    setCurrentLocation,
    currentLocation,
    disableLocation,
    locationKey,
  };
};
