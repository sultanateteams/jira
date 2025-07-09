<script lang="ts" setup>
import { tabs } from "~/constants";

useHead({ title: "Smart Office" });
</script>
<template>
  <!-- Hero section -->
  <section
    class="flex items-center justify-between h-[90vh] gap-4 bg-gradient-to-t from-white dark:from-black to-blue-600 dark:to-blue-800"
  >
    <div class="pl-20 flex-col space-x-4">
      <h1 class="text-5xl">
        Move fast, stay aligned and build better - together
      </h1>
      <p class="text-lg opacity-80">
        The #1 software development tool used by agule teams
      </p>
      <UButton>Try it free</UButton>
    </div>
    <NuxtImg src="./hero.webp" />
  </section>

  <!-- ?Tab section -->
  <UTabs :items="tabs" class="mt-6 px-4" :ui="{ list: { width: 'w-fit' } }">
    <!-- Tab heading -->
    <template #tab="{ item }">
      {{ item.label + "asd" }}
    </template>

    <!-- Tab content -->
    <template #item="{ item }">
      <div class="p-4 border rounded-md">
        <h3 class="text-xl font-semibold">{{ item.description }}</h3>
      </div>
    </template>
  </UTabs>
</template>
