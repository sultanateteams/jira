<template>
  <div>
    <UButtonGroup>
      <UButton color="neutral" variant="subtle" label="Button" />
      <UButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
    </UButtonGroup>
    <UButton>Button</UButton>
    <h2 class="p-8">Auth page</h2>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ layout: "auth" });
</script>
<style></style>
