<script lang="ts" setup>
import { account } from "~/utils/appwrite.js";

definePageMeta({ layout: "auth" });
useHead({
  title: "Auth | Jira",
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/ABSE.svg",
    },
  ],
});

const router = useRouter();
const loadingStore = useLoadingStore();

const isLogin = ref(true);
const toggleLogin = () => (isLogin.value = !isLogin.value);

onMounted(() => {
  loadingStore.isLoading = true;
  console.log(loadingStore.isLoading);
  account
    .get()
    .then((response) => {
      console.log(loadingStore.isLoading);
      router.push("/");
    })
    .finally(() => {
      loadingStore.set(false);
      console.log(loadingStore.isLoading);
    });
});
</script>
<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <template v-else>
    <div
      class="mt-[10vh] flex items-center justify-center w-full relative h-[90vh]"
    >
      sada
      <NuxtImg
        src="/bg-auth.jpg"
        class="absolute inset-0 w-full h-full object-cover z-10"
      />
      adsf
      <div
        class="absolute inset-0 w-full h-full object-cover z-20 dark:bg-black/40 bg-white/40"
      ></div>
      <UCard
        class="z-50 relative w-1/2"
        :ui="{ body: 'flex gap-4 items-center' }"
      >
        <div class="space-y-4 flex-1">
          <h1 class="text-2xl font-bold">
            <template v-if="isLogin">Login</template>
            <template v-else>Register</template>
          </h1>
          <p class="opacity-70" v-if="isLogin">
            Place use the following credentials to login
          </p>
          <p class="opacity-70" v-else>
            Place use the following credentials to register
          </p>
          <AuthLogin v-if="isLogin" :toggleLogin="toggleLogin" />
          <AuthRegister v-else :toggleLogin="toggleLogin" />
        </div>

        <div
          class="flex flex-col items-center justify-center"
          style="height: -webkit-fill-available"
        >
          <div class="w-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
          <span class="my-2 text-sm text-gray-500">OR</span>
          <div class="w-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <div class="space-y-4 flex-1">
          <UButton color="neutral" block size="lg">
            <Icon name="mdi:github" class="w-5 h-5" />
            <span>Login with Github</span> </UButton
          ><UButton color="neutral" block size="lg">
            <Icon name="mdi:google" class="w-5 h-5" />
            <span>Login with Google</span>
          </UButton>
        </div>
      </UCard>
    </div>
  </template>
</template>
