<script setup lang="ts">
import { card } from "#build/ui";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { useStatusQuery } from "~/query/use-status-query";
import type { IColumn, IDeal } from "~/types";
import { account } from "~/utils/appwrite.js";

useHead({
  title: "Documents | Smart office",
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/ABSE.svg",
    },
  ],
});
definePageMeta({ layout: "documents" });

const loadingStore = useLoadingStore();
const router = useRouter();
const authStore = useAuthStore();
const { data, isLoading, refetch } = useStatusQuery();
const { set } = useCurrentDealStore();

const dragCardRef = ref<IDeal | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const isMoving = ref(false);

onMounted(async () => {
  await account
    .get()
    .then((response) => {
      authStore.set({
        email: response.email,
        id: response.$id,
        name: response.name,
        status: response.status,
      });
    })
    .catch(() => {
      router.push("/");
    })
    .finally(() => {
      loadingStore.set(false);
    });
});

const { mutate, isPending } = useMutation({
  mutationKey: ["moveCard"],
  mutationFn: ({ docId, status }: { docId: string; status: string }) =>
    DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
  onSuccess: () => refetch(),
});

const handleStart = (card: IDeal, column: IColumn) => {
  isMoving.value = true;
  dragCardRef.value = card;
  sourceColumnRef.value = column;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (column: IColumn) => {
  console.log("drop", dragCardRef.value, sourceColumnRef.value);
  isMoving.value = false;
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.$id, status: column.id });
  }
};
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="grid gap-2 h-10" v-if="loadingStore.isLoading">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
    <div class="grid gap-2 h-10" v-if="loadingStore.isLoading">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
    <div class="grid gap-2 h-10" v-if="loadingStore.isLoading">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
    <div class="grid gap-2 h-10" v-if="loadingStore.isLoading">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
    <div
      v-else
      v-for="item in data"
      :key="item.id"
      @dragover="handleDragOver"
      @drop="() => handleDrop(item)"
      class="px-1"
      :class="
        isMoving &&
        'border-l-2 border-r-2 border-dotted h-screen  border-gray-500'
      "
    >
      <UButton class="w-full h-12" color="secondary" variant="outline">
        <div class="flex items-center space-x-2">
          <span class="font-bold">{{ item.name }}</span>
          <span class="text-sm text-neutral-500">{{ item.items.length }}</span>
        </div>
      </UButton>
      <SharedCreateDeal v-if="item.items.length == 0" :refetch="refetch" />
      <div
        v-else
        v-for="element in item.items"
        :key="element.$id"
        class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation"
        role="button"
        draggable="true"
        @dragstart="() => handleStart(element, item)"
        :class="isPending && 'opacity-50 cursor-not-allowed'"
      >
        <div class="flex items-center space-x-2">
          {{ element.name }}
        </div>
        <hr class="my-3" />
        <div class="opacity-55 text-sm line-clamp-1">
          {{ element.description }}
        </div>
        <div
          class="group flex hover:underline cursor-pointer items-center"
          role="button"
        >
          <UButton
            color="secondary"
            class="w-full mt-3 group"
            variant="ghost"
            @click="set(element)"
          >
            <span>More details...</span>
            <Icon
              name="material-symbols:arrow-right-alt-rounded"
              class="group-hover:translate-x-3 transition"
            />
          </UButton>
        </div>
      </div>
    </div>
    <Slideover />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }
  to {
    transform: scale(1), translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 0.3s ease-in-out;
}
</style>
