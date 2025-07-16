<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { account, ID } from "~/utils/appwrite.js";

const props = defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(4, "Name is required")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  name: "",
  email: "",
  password: "",
});

const loggedInUser = ref(null);

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });

  const { email, password, name } = event.data;
  await account.create(ID.unique(), email, password, name);
  login(email, password);
  console.log(event.data);
}

const login = async (email, password) => {
  await account.createEmailPasswordSession(email, password);
  loggedInUser.value = await account.get();
};
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" color="secondary" class="w-full" />
    </UFormField>
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
      Already exist account?
      <button
        type="button"
        class="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded cursor-pointer"
        @click="props.toggleLogin"
      >
        Sign in
      </button>
    </div>

    <UButton type="submit" color="secondary" class="px-10"> Submit </UButton>
  </UForm>
</template>
