<script lang="ts" setup>
import { account } from "~/utils/appwrite.js";

useHead({
  title: "Profile",
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/ABSE.svg",
    },
  ],
});
definePageMeta({ layout: "auth" });

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const toast = useToast();
const router = useRouter();

const isOpen = ref(false);

onMounted(async () => {
  try {
    const user = await account.get();
    authStore.set({
      email: user.email,
      id: user.$id,
      name: user.name,
      status: true,
    });
  } catch (error: any) {
    authStore.set({
      email: "",
      id: "",
      name: "",
      status: false,
    });
    router.push("/");
  } finally {
    loadingStore.set(false);
  }
});

const onConfirm = async () => {
  loadingStore.set(true);
  await account
    .deleteSession("current")
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      toast.add({
        title: "Error",
        description: (error as Error).message || "Something went wrong.",
        color: "error",
      });
    })
    .finally(() => {
      console.log("authStore.user:  ", authStore.user);
    });
  isOpen.value = false;
  loadingStore.set(false);
};
</script>

<template>
  <div
    class="w-full h-screen flex justify-center items-center dark:bg-gray-800 bg-gray-500"
  >
    <UCard class="w-1/3 dark:bg-gray-700 bg-gray-400">
      <h1 class="text-2xl font-bold">Profile</h1>
      <hr class="my-2" />
      <div class="flex items-center space-x-3" v-if="!loadingStore.isLoading">
        <UAvatar :alt="authStore.currentUser.name" />

        <div class="flex flex-col space-y-1">
          <p class="dark:text-gray-400 text-gray-600">
            Name:
            <span class="text-gray-100 font-bold">{{
              authStore.currentUser.name
            }}</span>
          </p>
          <p class="dark:text-gray-400 text-gray-600">
            Email:
            <span class="text-gray-100 font-bold">{{
              authStore.currentUser.email
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-3" v-else>
        <USkeleton class="h-12 w-12 rounded-full" />
        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>

      <UModal
        class="mt-2"
        v-model:open="isOpen"
        title="Chiqish!"
        close-icon="i-lucide-x"
        cancel="yo'q"
        ok=" ha"
        v-if="!loadingStore.isLoading"
      >
        <UButton class="px-3 h-10 mt-3" color="error">
          <span class="text-md">Log out</span>
          <Icon name="line-md:logout" size="20" />
        </UButton>
        <template #body>
          <p class="text-lg text-gray-700 dark:text-gray-200">
            Hisobdan chiqishni xoxlaysizmi?
          </p>
        </template>

        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton label="Yo‘q" color="neutral" @click="isOpen = false" />
            <UButton label="Ha" color="primary" @click="onConfirm" />
          </div>
        </template>
      </UModal>
    </UCard>
  </div>
</template>
