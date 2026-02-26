import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      phone,
      bookRequirement,
    }: {
      name: string;
      phone: string;
      bookRequirement: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitForm(name, phone, bookRequirement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
