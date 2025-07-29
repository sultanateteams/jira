<script lang="ts" setup>
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { FormError } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";

const toast = useToast();

const props = defineProps({
  refetch: {
    type: Function,
    required: true,
  },
});

type Schema = v.InferOutput<typeof schema>;
const schema = v.object({
  name: v.pipe(v.string(), v.string("Invalid email")),
  description: v.pipe(v.string(), v.string("Invalid email")),
});

const store = useEditDealStore();

const isOpen = computed({
  get: () => store.isOpen,
  set: (value: boolean) => (store.isOpen = value),
});

const state = reactive({
  name: store.deal?.name,
  description: store.deal?.description,
});

watch(
  () => store.deal,
  () => {
    state.name = store.deal?.name;
    state.description = store.deal?.description;
  }
);

const { mutate, isPending } = useMutation({
  mutationKey: ["edit-deal", store.deal?.$id],
  mutationFn: (data: { id: string; name: string; description: string }) =>
    DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, data.id, {
      name: data.name,
      description: data.description,
    }),
  onSuccess: () => {
    props.refetch();
    isOpen.value = false;
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
  mutate({ id: store.deal?.$id, name, description });
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Edit deal"
    :close="{
      color: 'error',
      variant: 'outline',
      class: 'rounded-full',
    }"
    description="Optimised"
  >
    <template #body>
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
    </template>
  </UModal>
</template>
