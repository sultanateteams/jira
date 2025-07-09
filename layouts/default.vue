<template>
  <LayoutsMainNavbar />
  <div class="min-h-[90vh] mt-[10vh] bg-amber-50 mx-auto dark:bg-black">
    <div class="">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LayoutsMainNavbar } from "#components";
</script>
<style></style>
