<script lang="ts" setup>
import {
  NuxtImg,
  NuxtLink,
  SharedColorMode,
  UButton,
  UModal,
} from "#components";

import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const toast = useToast();

const { currentUser } = storeToRefs(authStore);
const isOpen = ref(false);

const onCancel = () => {
  isOpen.value = false;
  isOpen.value = true;
  console.log(isOpen.value);
};
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
    class="h-[10vh] fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-900 z-50"
  >
    <div
      class="container h-full mx-auto flex items-center justify-between pt-2"
    >
      <NuxtLink to="/" class="flex space-x-1 items-center">
        <NuxtImg src="./ABS.svg" hight="75" width="75"/>
        <span class="text-2xl font-medium">Software</span>
      </NuxtLink>
      <!-- <NuxtLink to="/" class="flex space-x-1 items-center">
        <NuxtImg src="./logo.svg" hight="50" width="50" />
        <span class="text-2xl font-medium">ABS Software</span>
      </NuxtLink> -->
      <div class="flex items-center space-x-2">
        <SharedColorMode />
        <template v-if="currentUser.status">
          <NuxtLink to="/documents">
            <UButton color="primary" variant="outline">Documents</UButton>
          </NuxtLink>
          <UModal
            v-model:open="isOpen"
            title="Chiqish!"
            close-icon="i-lucide-x"
            cancel="yo'q"
            ok=" ha"
          >
            <UButton label="Log Out" color="error" variant="outline" />

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
        </template>
        <template v-else>
          <NuxtLink to="/auth">
            <UButton color="info">Get it Free</UButton>
          </NuxtLink>
          <NuxtLink to="/auth">
            <UButton color="info" variant="soft">Sign in</UButton>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
<style></style>
