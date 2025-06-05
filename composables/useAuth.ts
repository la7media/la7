import type { RegisterParams } from "~/lib/interfaces/auth";

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const userS = useSupabaseUser();

  const loginParams = ref<{
    email?: string;
    phone?: string;
    password: string;
  }>({
    email: "",
    phone: "",
    password: "",
  });
  const errorMessage = ref("");
  const user = useState<Record<string, unknown | object> | null>(
    "auth-profile",
    () => null
  );

  const loadProfile = async () => {
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
    user.value = { ...userS.value, profile: profile || null };
  };

  const login = async (token: string) => {
    if (!token) {
      errorMessage.value = "No se validó el captcha.";
      return;
    }
    const loginData: typeof loginParams.value = {
      password: loginParams.value.password,
    };

    const input = loginParams.value.phone?.trim();

    // Verificar si es correo o celular
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input ?? "")) {
      loginData.email = input;
    } else if (/^\d{7,15}$/.test(input ?? "")) {
      loginData.phone = input;
    } else {
      errorMessage.value =
        "Ingresa un correo válido o un número de celular válido.";
      return { error: true, message: errorMessage.value };
    }

    const { error } = await supabase.auth.signInWithPassword({
      ...(loginData as { username: string; password: string; phone: string }),
      options: {
        captchaToken: token,
      },
    });

    if (error) {
      switch (error.message) {
        case "Invalid login credentials":
          errorMessage.value = "Credenciales incorrectas. Verifica tus datos.";
          break;
        case "Phone not confirmed":
          errorMessage.value =
            "Debes confirmar tu celular antes de iniciar sesión.";
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
      await loadProfile();
    }

    return { error, message: errorMessage.value };
  };

  const register = async (params: RegisterParams, token: string) => {
    if (!token) {
      return { error: "No se envió token" };
    }
    try {
      const supabase = useSupabaseClient();

      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          captchaToken: token,
          data: {
            nombre: params.nombre,
            celular: parseInt(params.celular), // Convertir a numeric
            direccion: params.direccion || null,
            last_ubication: null,
          },
        },
      });

      if (authError) {
        console.error("Error en autenticación:", authError);
        return { error: authError.message };
      }

      if (!authData.user) {
        return { error: "No se pudo crear el usuario" };
      }

      // 1.5. Actualizar el usuario con el número de teléfono
      const { error: updateError } = await supabase.auth.updateUser({
        phone: params.celular,
      });

      if (updateError) {
        console.error("Error al actualizar teléfono:", updateError);
        // No retornamos error aquí porque el usuario ya fue creado
        console.warn("Usuario creado pero no se pudo actualizar el teléfono");
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
      user.value = null;
      useRouter().push("/"); // Recargar la ruta para reflejar el cambio
    }
  };

  const isAdmin = () => {
    return user.value?.profile?.type === "admin";
  };

  return {
    user,
    isAdmin,
    logout,
    login,
    register,
    loginParams,
    errorMessage,
  };
};
