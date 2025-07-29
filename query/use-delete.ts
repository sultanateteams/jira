import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";

export const useDelete = (refetch: Function) => {
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-deals"],
    mutationFn: (id: string) =>
      DATABASE.deleteDocument(DB_ID, COLLECTION_DEALS, id),
    onSuccess: () => {
      refetch();
      toast.add({
        title: "Success",
        description: "Your comment has been added successfully",
        color: "success",
      });
    },
    onError: (error) => {
      toast.add({
        title: "Error",
        description: error.message,
        color: "error",
      });
    },
  });

  return { deleteDeal: mutate, isDeleting: isPending };
};
