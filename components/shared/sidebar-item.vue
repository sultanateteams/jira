<script lang="ts" setup>
import { sidebarItems } from "~/constants";
const route = useRoute();
</script>

<template>
  <NuxtLink v-for="(item, index) in sidebarItems" :key="index" :to="item.url">
    <UButton
      class="w-full text-left h-12 flex justify-start rounded-none"
      :variant="route.fullPath == item.url ? 'solid' : 'ghost'"
    >
      <Icon :name="item.icon" class="mr-2" size="22" />
      {{ item.name }}</UButton
    >
  </NuxtLink>
</template>
