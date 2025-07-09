<template>
  <div
    class="h-[10vh] fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-900 z-50"
  >
    <div
      class="container h-full mx-auto flex items-center justify-between pt-2"
    >
      <NuxtLink to="/" class="flex space-x-1 items-center">
        <NuxtImg src="./logo.svg" hight="50" width="50" />
        <span class="text-2xl font-medium">ABS Software</span>
      </NuxtLink>
      <div class="flex items-center space-x-2">
        <SharedColorMode />
        <NuxtLink to="/auth">
          <UButton color="info">Get it Free</UButton>
        </NuxtLink>
        <NuxtLink to="/auth">
          <UButton color="info" variant="soft">Sign in</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import { NuxtImg, NuxtLink, SharedColorMode } from "#components";
</script>
<style></style>
