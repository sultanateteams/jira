<script lang="ts" setup>
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { account } from "~/utils/appwrite.js";
import type { FormError } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { EnumStatus, type ICreateDeals } from "~/types";

type Schema = v.InferOutput<typeof schema>;
const schema = v.object({
  name: v.pipe(v.string(), v.string("Invalid email")),
  description: v.pipe(v.string(), v.string("Invalid email")),
});

const toast = useToast();
const authStore = useAuthStore();

const state = reactive({
  name: undefined,
  description: undefined,
});

const props = defineProps({
  refetch: {
    type: Function,
    required: true,
  },
});

const validate = (state: any): FormError[] => {
  const errors = [];

  if (!state.name) {
    errors.push({ path: "name", message: "Required" });
  }
  if (!state.description) {
    errors.push({ path: "description", message: "Required" });
  }

  return errors;
};

const { isPending, mutate } = useMutation({
  mutationKey: ["create-deal"],
  mutationFn: (data: ICreateDeals) =>
    DATABASE.createDocument(DB_ID, COLLECTION_DEALS, UNIQUE_ID, data),
  onSuccess: () => {
    props.refetch();
    state.name = undefined;
    state.description = undefined;
    toast.add({
      title: "Success",
      description: "Deal created successfully",
    });
  },
  onError: () => {
    toast.add({
      title: "Error",
      description: "Someting went wrong",
      color: "error",
    });
  },
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, description } = event.data;
  mutate({
    name,
    description,
    status: EnumStatus.todo,
    userId: authStore.currentUser.id,
  });
}
</script>

<template>
  <UPopover :content="{ side: 'left' }">
    <UButton
      color="secondary"
      variant="ghost"
      class="opacity-75 hover:opacity-100 mx-auto mt-3"
    >
      <Icon name="radix-icons:plus-circled" size="35" />
    </UButton>

    <template #content>
      <div class="p-2 w-72 m-4 inline-flex">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 w-full"
          @submit="onSubmit"
        >
          <UFormField label="Name" name="name">
            <UInput
              v-model="state.name"
              color="secondary"
              class="w-full"
              autocomplete="true"
            />
          </UFormField>

          <UFormField label="Descrition" name="description">
            <UTextarea
              v-model="state.description"
              color="secondary"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            color="secondary"
            class="px-10 w-full flex justify-center"
            :disabled="isPending"
          >
            <template v-if="!isPending"> Submit </template>
            <template v-else>
              <Icon name="eos-icons:three-dots-loading" />
            </template>
          </UButton>
        </UForm>
      </div>
    </template>
  </UPopover>
</template>
