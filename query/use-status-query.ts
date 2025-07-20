import { useQuery } from "@tanstack/vue-query";
import { Query } from "appwrite";
import { COLLECTION_DEALS, DB_ID, status } from "~/constants";
import type { IComumn, IDeal } from "~/types";
import { DATABASE } from "~/utils/appwrite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth.store";

export const useStatusQuery = () => {
  const authStore = useAuthStore();

  const userId = computed(() => authStore.currentUser.id); // ✅ Bu yerda .value yo‘q

  return useQuery({
    queryKey: ["deals", userId], // Watch `currentUser.id`
    enabled: computed(() => !!userId), // Don't run unless `id` exists
    queryFn: () =>
      DATABASE.listDocuments(DB_ID, COLLECTION_DEALS, [
        Query.equal("userId", userId.value),
      ]),
    select: (data: any) => {
      const newBoard: IComumn[] = status.map((item) => ({
        ...item,
        items: [],
      }));
      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((item) => item.id == deal.status);
        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            name: deal.name,
            description: deal.description,
            status: deal.status,
            $id: deal.$id,
          });
        }
      }

      return newBoard;
    },
  });
};
