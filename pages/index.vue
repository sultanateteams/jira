<script lang="ts" setup>
import { tabs, templates } from "~/constants";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { currentUser } = storeToRefs(authStore);
useHead({
  title: "Smart Office",
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/ABSE.svg",
    },
  ],
});
</script>
<template>
  <main class="pb-72">
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
        <template v-if="currentUser.status">
          <NuxtLink to="/documents">
            <UButton color="secondary">Documents</UButton>
          </NuxtLink>
        </template>
        <template v-else>
          <UButton>Try it free</UButton>
        </template>
      </div>
      <NuxtImg src="./hero.webp" />
    </section>

    <!-- ?Tab section -->
    <section>
      <UTabs
        :items="tabs"
        class="mt-6 px-4 w-fit"
        :ui="{ list: { with: 'w-fit' } }"
      >
        <template #content="{ item }">
          <div class="flex justify-between items-center gap-6 mt-8">
            <div class="w-[40%]">
              <h1 class="text-4xl font-bold">
                {{ item.label }}
              </h1>
              <p class="mt-6 text-xl">{{ item.description }}</p>
              <div
                class="py-4 mt-12 rounded-r-full flex flex-col space-y-2 bg-gradient-to-r from-white dark:from-black to-blue-500 dark:to-blue-800"
              >
                <Icon name="ri:double-quotes-l" class="text-7xl" />
                <p class="text-lg pl-2">{{ item.credentails.text }}</p>
                <div class="pl-2 opacity-70">
                  <p class="font-bold">{{ item.credentails.username }}</p>
                  <p class="text-sm">{{ item.credentails.company }}</p>
                </div>
              </div>
            </div>
            <NuxtImg :src="item.image" class="w-[60%]" />
          </div>
        </template>
      </UTabs>
    </section>

    <section>
      <h1 class="text-4xl font-medium text-center mt-20">Easier then ever</h1>
      <div class="flex items-center justify-between max-w-xl mx-auto mt-4">
        <div
          class="w-16 h-16 bg-blue-500 dark:bg-blue-800 rounded-full flex justify-center items-center"
        >
          <Icon name="material-symbols:file-copy" class="text-white text-4xl" />
        </div>
        <div
          class="flex-1 h-1 bg-gradient-to-r from-blue-500 dark:from-blue-800 to-gray-500 dark:to-gray-800"
        ></div>
        <div
          class="w-16 h-16 bg-gray-500 dark:bg-gray-800 rounded-full flex justify-center items-center"
        >
          <Icon
            name="material-symbols:edit"
            class="text-blue-300 dark:text-blue-600 text-4xl"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 mt-20">
        <div class="bg-blue-500 dark:bg-blue-800 p-8">
          <div class="flex flex-col space-y-2 items-center">
            <h1 class="text-2xl font-medium">
              Templates give you a head start
            </h1>
            <p class="text-xl">Get started with ready-made templates.</p>
          </div>
          <div v-for="(item, index) in templates" :key="index">
            <div class="flex flex-col mt-4">
              <div
                class="bg-gray-500 dark:bg-gray-800 flex items-center gap-5 h-20"
              >
                <div
                  class="flex justify-center items-center bg-blue-500/70 dark:bg-blue-800/50 w-[15%] h-full"
                >
                  <NuxtImg :src="item.image" class="w-12" />
                </div>
                <div class="flex flex-col space-y-2">
                  <h2 class="font-medium text-xl">{{ item.name }}</h2>
                  <div
                    class="group flex hover:underline cursor-pointer items-center"
                    role="button"
                  >
                    <span>Learn more</span>
                    <Icon
                      name="material-symbols:arrow-right-alt-rounded"
                      class="group-hover:translate-x-3 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="py-4 mt-12 rounded-r-full flex flex-col space-y-2 bg-gradient-to-r from-blue-500 dark:from-blue-800 to-gray-500 dark:to-gray-800"
          >
            <Icon name="ri:double-quotes-l" class="text-7xl" />
            <p class="text-lg pl-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatum.
            </p>
            <div class="pl-2 opacity-70">
              <p class="font-bold">Lorem, ipsum dolor.</p>
              <p class="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-500 dark:bg-gray-800 p-8 text-center">
          <h1 class="text-2xl font-medium">
            Placeat quae voluptatibus consequuntur.
          </h1>
          <p class="text-xl text-center mb-8">
            Repellendus quis cumque molestiae dignissimos ratione dolore ab,
            asperiores non
          </p>
          <NuxtImg src="/product.webp" />
        </div>
      </div>
    </section>
  </main>
</template>
