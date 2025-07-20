<template>
  <div
    class="fixed top-0 left-0 bottom-0 h-screen dark:bg-gray-900 bg-gray-300 w-72 border-r-1 dark:border-gray-800 border-gray-100"
  >
    <div class="flex flex-col space-y-6">
      <NuxtLink to="/" class="flex items-center space-x-1 pl-4 pt-6">
        <NuxtImg src="./logo.svg" hight="50" width="50" />
        <span class="text-2xl font-medium">ABS Software</span>
      </NuxtLink>
      <div>
        <SharedSidebarItem />
      </div>
    </div>
  </div>
</template>
