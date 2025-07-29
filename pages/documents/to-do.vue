<script lang="ts" setup>
import { useDeals } from "~/query/use-deals";
import { useDelete } from "~/query/use-delete";
import { EnumStatus } from "~/types";

useHead({
  title: "To-do | Smart office",
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/ABSE.svg",
    },
  ],
});
definePageMeta({ layout: "documents" });
const { data, isLoading, refetch } = useDeals(EnumStatus.todo);
const { set } = useCurrentDealStore();
const { isDeleting, deleteDeal } = useDelete(refetch);
const editDeal = useEditDealStore();

const handleDelete = (id: string) => {
  const confirm = window.confirm("Are you sure want to delete this deal");
  if (confirm) {
    deleteDeal(id);
  }
};
</script>

<template>
  <div class="flex items-center justify-center">
    <h1 class="text-4xl font-bold">To Do</h1>
    <SharedCreateDeal status="to-do" :refetch="refetch" />
  </div>
  <hr />
  <div class="grid grid-cols-4 gap-2" v-if="isLoading">
    <div class="my-3" v-for="n in 4" :key="n">
      <div class="flex gap-3">
        <USkeleton class="h-12 w-12 rounded-full" />
        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="data?.length">
      <div class="grid grid-cols-4 gap-2">
        <div
          class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation"
          v-for="(item, index) in data"
          :key="index"
          role="button"
          @click="set(item)"
        >
          <div class="flex items-center space-x-2">
            <span class="font-bold text-lg uppercase">{{ item.name }}</span>
          </div>
          <hr />
          <div class="opacity-55 text-sm line-clamp-1">
            {{ item.description }}
          </div>

          <div class="grid grid-cols-2 gap-2 mt-2" @click.stop>
            <UButton
              color="secondary"
              variant="outline"
              @click="editDeal.set(item)"
              >Edit</UButton
            >
            <UButton
              color="error"
              variant="outline"
              @click="handleDelete(item.$id)"
              >Delete</UButton
            >
          </div>
        </div>
        <Slideover />
        <SharedEditDeal :refetch="refetch" />
      </div>
    </div>
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
