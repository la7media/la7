import type { RegisterParams } from "~/lib/interfaces/auth";

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const userS = useSupabaseUser();
  const loginParams = ref({
    phone: "",
    password: "",
  });
  const errorMessage = ref("");
  const { data, refresh, error, status } = useAsyncData(
    "authuser", // clave única para el caché
    async () => {
      if (!userS.value) return { user: null };
      const { data: profile, error } = await supabase
        .from("perfiles")
        .select("*")
        .eq("user_id", userS.value!.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw createError({ statusCode: 500, statusMessage: error.message });
      }
      const userWithProfile = { ...userS.value, profile: profile || null };
      return { user: userWithProfile };
    },
    {
      // La data se cachea por defecto en el lado del servidor durante la SSR
      // y se reusa en el cliente tras la hidratación.
      default: () => ({ user: null }),
    }
  );

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword(loginParams.value);
    if (error) {
      switch (error.message) {
        case "Invalid login credentials":
          errorMessage.value =
            "Credenciales incorrectas. Verifica tu teléfono y contraseña.";
          break;
        case "Phone not confirmed":
          errorMessage.value =
            "Debes confirmar tu teléfono antes de iniciar sesión.";
          break;
        case "Too many requests":
          errorMessage.value =
            "Demasiados intentos. Intenta nuevamente en unos minutos.";
          break;
        default:
          console.log(error.message);
          errorMessage.value = "Error al iniciar sesión. Intenta nuevamente.";
      }
    } else {
      await refresh();
    }
    return { error, message: errorMessage.value };
  };

  const register = async (params: RegisterParams) => {
    try {
      const supabase = useSupabaseClient();

      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        phone: params.celular,
        password: params.password,
        options: {
          data: {},
        },
      });

      if (authError) {
        console.error("Error en autenticación:", authError);
        return { error: authError.message };
      }

      if (!authData.user) {
        return { error: "No se pudo crear el usuario" };
      }

      // 2. Crear perfil en la tabla perfiles
      const { error: profileError } = await supabase.from("perfiles").insert({
        user_id: authData.user.id,
        nombre: params.nombre,
        celular: parseInt(params.celular), // Convertir a numeric
        direccion: params.direccion || null,
        last_ubication: null,
      } as never);

      if (profileError) {
        console.error("Error al crear perfil:", profileError);

        return { error: "Error al crear el perfil de usuario" };
      }

      return { data: authData, error: null };
    } catch (error) {
      console.error("Error general en registro:", error);
      return {
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido durante el registro",
      };
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    else {
      // Limpiar el caché de datos del usuario
      data.value = { user: null };
      useRouter().push("/"); // Recargar la ruta para reflejar el cambio
    }
  };

  const isAdmin = () => {
    return user.value?.profile?.type === "admin";
  };

  const user = computed(() => {
    return data.value?.user || null;
  });

  return {
    user,
    status,
    refresh,
    error,
    isAdmin,
    logout,
    login,
    register,
    loginParams,
    errorMessage,
  };
};
