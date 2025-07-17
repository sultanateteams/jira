<script lang="ts" setup>
import { LayoutsMainNavbar } from "#components";
import { account } from "~/utils/appwrite"; // Appwrite instance
import { onMounted } from "vue";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

onMounted(async () => {
  try {
    const user = await account.get();
    authStore.set({
      email: user.email,
      id: user.$id,
      name: user.name,
      status: true,
    });
  } catch (error) {
    authStore.set({
      email: "",
      id: "",
      name: "",
      status: false,
    });
    console.log(error);
  } finally {
    loadingStore.set(false);
  }
});
</script>
<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <template v-else>
    <LayoutsMainNavbar />
    <div class="min-h-[90vh] mt-[10vh] bg-amber-50 mx-auto dark:bg-black">
      <div>
        <slot />
      </div>
    </div>
  </template>
</template>
<style></style>
