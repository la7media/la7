import { useSupabaseClient } from "#imports";

interface ActivationUpdate {
  active: boolean;
  activator_id: string | null;
  inscription_value: number;
  activation_code: null;
}

export const useActivator = () => {
  const activeUser = async (
    code: number,
    value: number,
    activatorId: string | null
  ): Promise<{ error: unknown }> => {
    const supabase = useSupabaseClient();

    const payload: ActivationUpdate = {
      active: true,
      activator_id: activatorId,
      inscription_value: value,
    };

    const { error, data } = await supabase
      .from("activations")
      .update(payload as never)
      .eq("activation_code", code)
      .eq("active", false);
    console.log(data);
    return { error };
  };
  return { activeUser };
};
