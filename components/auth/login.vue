<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" color="secondary" class="w-full" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput
        v-model="state.password"
        type="password"
        color="secondary"
        class="w-full"
      />
    </UFormField>

    <div class="text-sm text-neutral-500">
      Not registered yet?
      <button
        type="button"
        class="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded cursor-pointer"
        @click="props.toggleLogin"
      >
        Sign up
      </button>
    </div>

    <UButton type="submit" color="secondary" class="px-10"> Submit </UButton>
  </UForm>
</template>
