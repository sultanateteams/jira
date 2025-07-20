<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { account} from "~/utils/appwrite.js";

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

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
type Email = v.InferOutput<typeof schema>["email"];
type Password = v.InferOutput<typeof schema>["password"];

const state = reactive({
  email: "",
  password: "",
});

const loggedInUser: any = ref(null);
const isLoading = ref(false);
const errorMassage: any = ref(null);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  // await account.deleteSession("current");
  const { email, password } = event.data;
  try {
    await account.createEmailPasswordSession(email, password);
    const response = await account.get();
    console.log("login:  ", response);
    toast.add({
      title: "Success",
      description: "The form has been submitted.",
      color: "success",
    });

    errorMassage.value = null;
    authStore.set({
      email: response.email,
      id: response.$id,
      name: response.name,
      status: response.status,
    });
    await router.push("/");
  } catch (error) {
    console.log(error);
    errorMassage.value = (error as Error).message || "Something went wrong.";
  } finally {
    console.log("sign finally");
    isLoading.value = false;
  }
  console.log(event.data);
}
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
    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        color="secondary"
        class="w-full"
        autocomplete="true"
      />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput
        v-model="state.password"
        autocomplete="true"
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
