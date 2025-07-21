<script lang="ts" setup>
const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

onMounted(async () => {
  await account
    .get()
    .then((response) => {
      authStore.set({
        email: response.email,
        id: response.$id,
        name: response.name,
        status: response.status,
      });
    })
    .catch(() => {
      router.push("/");
    })
    .finally(() => {
      loadingStore.set(false);
    });
});
</script>

<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <main v-else>
    <LayoutsNavbar />
    <LayoutsSidebar />
  </main>
  <section class="min-h-screen bg-white dark:bg-black pl-72 pt-[10vh]">
    <div class="p-4">
      <slot />
    </div>
  </section>
</template>
<style></style>
