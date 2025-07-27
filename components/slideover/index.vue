<script lang="ts" setup>
import dayjs from "dayjs";
const store = useCurrentDealStore();

const isOpen = computed({
  get: () => store.isOpen,
  set: (value: boolean) => (store.isOpen = value),
});

const isExpended = computed(() =>
  (store.deal?.description || "").length > 200 ? true : false
);

const showDescription = ref(false);

const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};
</script>

<template>
  <USlideover v-model:open="isOpen" title="About deal">
    <template #description>
      <small class="mb-0 pb-0">Name:</small>
      <h1 class="mb-3">
        {{ store.deal?.name }}
      </h1>
      <small class="mb-0 pb-0 pt-4">Status:</small><br />
      <UBadge class="mb-3"> {{ store.deal?.status }}</UBadge
      ><br />
      <small class="mt-4">Date:</small><br />
      <UBadge color="secondary" variant="outline" class="mb-3">
        {{ dayjs(store.deal?.$createdAt).format("YYYY-MM-DD", true) }}
      </UBadge>
    </template>
    <template #body>
      <div class="relative group" v-if="isExpended">
        <p>
          <template v-if="showDescription">
            {{ store.deal?.description }}
            <div
              role="button"
              @click="toggleDescription"
              class="relative flex justify-center group-hover:opacity-100 transition opacity-0"
            >
              <Icon name="ic:baseline-arrow-upward"></Icon>
            </div>
          </template>
          <template v-else>
            <div
              class="bg-gradient-to-b from-transparent to-gray-800 inset-0 absolute"
            ></div>
            {{ store.deal?.description.slice(0, 200) }} ...
            <div
              role="button"
              @click="toggleDescription"
              class="relative flex justify-center group-hover:opacity-100 transition opacity-0"
            >
              <Icon name="ic:baseline-arrow-downward"></Icon>
            </div>
          </template>
        </p>
      </div>
      <p v-else>{{ store.deal?.description }}</p>
      <hr class="my-4" />
      <SlideoverComments />
    </template>
  </USlideover>
</template>
