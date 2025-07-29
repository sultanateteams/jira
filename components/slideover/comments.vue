<script lang="ts" setup>
import dayjs from "dayjs";
import { useComments } from "~/query/use-comments";

import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_COMMMENTS, DB_ID } from "~/constants";
import { ID } from "appwrite";
const { deal } = useCurrentDealStore();

const { data, refetch, isLoading } = useComments();

const state = reactive({
  comment: undefined,
});

const { mutate, isPending } = useMutation({
  mutationKey: ["create-comment"],
  mutationFn: ({ text }: { text: string }) =>
    DATABASE.createDocument(DB_ID, COLLECTION_COMMMENTS, ID.unique(), {
      text,
      deal: deal.$id,
    }),
  onSuccess: () => {
    refetch();
    toast.add({
      title: "Success",
      description: "Your comment has been added successfully",
      color: "success",
    });
    state.comment = undefined;
  },
  onError: (error) => {
    toast.add({
      title: "Error",
      description: error.message,
      color: "error",
    });
  },
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.comment) errors.push({ name: "comment", message: "Required" });
  return errors;
};

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  mutate({ text: event.data.comment });
  console.log(event.data.comment);
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    @submit="onSubmit"
    class="relative h-12 mb-12"
  >
    <UFormField label="Comment" name="comment">
      <UInput
        size="lg"
        placeholder="Create a comment..."
        d
        color="secondary"
        class="w-100"
        v-model="state.comment"
        :disabled="isPending"
      />
      <div class="absolute top-0 right-0 bottom-0">
        <UButton
          color="secondary"
          size="lg"
          type="submit"
          :disabled="isPending"
        >
          <Icon name="material-symbols:add" size="20" />
        </UButton>
      </div>
    </UFormField>
  </UForm>
  <div v-if="isLoading" class="flex items-center space-x-4 mt-4">
    <USkeleton class="h-12 w-12 rounded-full" />

    <div class="grid gap-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>
  <template v-else-if="data">
    <div
      class="flex items-center space-x-4 mt-4"
      v-for="item in data"
      :key="item.$id"
    >
      <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
      <div
        class="border-gray-100 rounded-md w-full dark:bg-gray-800 bg-gray-200 relative px-3 m-h-12"
      >
        <div class="absolute bottom-1 right-2 text-blue-500 text-sm font-bold">
          {{ dayjs(item.$createdAt).format("HH:mm") }}
        </div>
        <p class="pt-3 pb-5">
          {{ item.text }}
        </p>
      </div>
    </div>
  </template>
</template>
