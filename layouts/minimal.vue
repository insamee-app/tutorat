<template>
  <main class="pt-16 w-full h-screen flex flex-col overflow-hidden relative">
    <div class="flex justify-center mb-16">
      <NuxtLink :to="{ name: 'index' }">
        <NuxtImg
          src="/logos/tutorat.png"
          height="128"
          alt="logo de la plateforme tutorat"
          class="mx-auto"
        />
      </NuxtLink>
    </div>
    <Nuxt />
  </main>
</template>
