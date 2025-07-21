<script lang="ts" setup>
const authStore = useAuthStore();

const isOpen = ref(false);
const loadingStore = useLoadingStore();
const toast = useToast();

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
  <UPopover :content="{ side: 'left' }">
    <UButton color="neutral" variant="subtle">
      <UAvatar src="" :alt="authStore.user.name" class="uppercase" />
    </UButton>

    <template #content>
      <div class="p-2 w-72 m-4 inline-flex">
        <div class="space-y-0">
          <p class="text-neutral-600 text-sm">
            {{ authStore.currentUser.email }}
          </p>
          <div class="flex items-center mt-3 space-x-2">
            <div class="rounded-md bg-gray-600 p-1">
              <UAvatar :alt="authStore.currentUser.name" class="uppercase" />
            </div>
            <p class="capitalize text-[15px]">
              {{ authStore.currentUser.name }}'s documents
            </p>
          </div>
          <hr class="my-2" />
          <div class="flex flex-col gap-0 space-x-0 space-y-0">
            <NuxtLink to="/profile" class="flex">
              <UButton class="w-full flex">Pofile</UButton>
            </NuxtLink>

            <UModal
              class="mt-2"
              v-model:open="isOpen"
              title="Chiqish!"
              close-icon="i-lucide-x"
              cancel="yo'q"
              ok=" ha"
            >
              <UButton label="Log Out" color="error" />
              <template #body>
                <p class="text-lg text-gray-700 dark:text-gray-200">
                  Hisobdan chiqishni xoxlaysizmi?
                </p>
              </template>

              <template #footer>
                <div class="flex justify-end space-x-2">
                  <UButton
                    label="Yo‘q"
                    color="neutral"
                    @click="isOpen = false"
                  />
                  <UButton label="Ha" color="primary" @click="onConfirm" />
                </div>
              </template>
            </UModal>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
