<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { account, UNIQUE_ID } from "~/utils/appwrite.js";

const toast = useToast();

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(4, "Name is required")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

type Email = v.InferOutput<typeof schema>["email"];
type Password = v.InferOutput<typeof schema>["password"];
type Schema = v.InferOutput<typeof schema>;

const props = defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const state = reactive({
  name: "",
  email: "",
  password: "",
});

const loggedInUser: any = ref(null);
const isLoading = ref(false);
const errorMassage: any = ref(null);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  const { email, password, name } = event.data;
  try {
    await account.create(UNIQUE_ID, email, password, name);
    login(email, password);
    props.toggleLogin();
    console.log(event.data);
    toast.add({
      title: "Success",
      description: "The form has been submitted.",
      color: "success",
    });
    errorMassage.value = null;
  } catch (error) {
    console.log(error);
    errorMassage.value = (error as Error).message || "Something went wrong.";
  } finally {
    isLoading.value = false;
  }
}

const login = async (email: Email, password: Password) => {
  await account.createEmailPasswordSession(email, password);
  loggedInUser.value = await account.get();
};
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UAlert
      v-if="errorMassage"
      title="Error!"
      :description="errorMassage"
      color="error"
      variant="outline"
    />
    <UFormField label="Name" name="name">
      <UInput
        v-model="state.name"
        autocomplete="true"
        color="secondary"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        autocomplete="true"
        color="secondary"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput
        v-model="state.password"
        type="password"
        autocomplete="true"
        color="secondary"
        class="w-full"
      />
    </UFormField>

    <div class="text-sm text-neutral-500">
      Already exist account?
      <button
        :disabled="isLoading"
        type="button"
        class="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded cursor-pointer"
        @click="props.toggleLogin"
      >
        Sign in
      </button>
    </div>

    <UButton
      type="submit"
      color="secondary"
      class="px-10"
      :disabled="isLoading"
    >
      <template v-if="!isLoading"> Submit </template>
      <template v-else>
        <Icon name="eos-icons:three-dots-loading" />
      </template>
    </UButton>
  </UForm>
</template>
