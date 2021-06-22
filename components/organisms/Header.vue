<template>
  <div class="grid items-center grid-cols-2 p-4">
    <span class="text-2xl font-bold text-primary-dark"
      ><nuxt-link to="/">T</nuxt-link></span
    >
    <div class="flex items-center justify-end space-x-8">
      <InsameeAppButton border large primary>S'inscrire</InsameeAppButton>
      <IconBurger @clicked="showSlider = true" />
    </div>

    <InsameeNavMobile
      :value="showSlider"
      :list="[
        {
          name: 'Accueil',
          path: '/',
        },
        {
          name: 'Chercher un tutorat',
          path: '/tutorat',
        },
        {
          name: 'Contact',
          path: '/contact',
        },
      ]"
      @close="showSlider = false"
    >
      <template #actions>
        <InsameeAppButton class="mr-4" primary :to="{ name: 'signin' }">
          S'inscrire
        </InsameeAppButton>
        <InsameeAppButton primary border :to="{ name: 'login' }">
          Se connecter
        </InsameeAppButton>
      </template>
    </InsameeNavMobile>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showSlider: false,
    }
  },
}
</script>

<style></style>
