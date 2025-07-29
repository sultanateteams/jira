// import { DATABASE } from "~/utils/appwrite";
// import { useQuery } from "@tanstack/vue-query";
// import { useCurrentDealStore } from "./../store/current-deal";
// import { COLLECTION_DEALS, DB_ID } from "~/constants";
// import { Query } from "appwrite";

// export const useComments = () => {
//   const storeDeal = useCurrentDealStore();
//   const dealId = storeDeal.deal?.$id as string;
//   console.log("dealId: ", dealId);
//   return useQuery({
//     queryKey: ["comments", dealId],
//     queryFn: () =>
//       DATABASE.listDocuments(DB_ID, COLLECTION_DEALS, [
//         Query.equal("deal", dealId),
//       ]),
//     select: (data) => data.documents,
//   });
// };

import { DATABASE } from "~/utils/appwrite";
import { useQuery } from "@tanstack/vue-query";
import { useCurrentDealStore } from "./../store/current-deal";
import { COLLECTION_COMMMENTS, DB_ID } from "~/constants";
import { Query } from "appwrite";

export const useComments = () => {
  const storeDeal = useCurrentDealStore();
  const dealId = storeDeal.deal?.$id;
  console.log("dealId:  ", dealId)
  return useQuery({
    queryKey: ["comments", dealId],
    queryFn: () =>
      DATABASE.listDocuments(DB_ID, COLLECTION_COMMMENTS, [
        Query.equal("deal", dealId!),
      ]),
    select: (data) => data.documents,
    enabled: !!dealId,
  });
};
