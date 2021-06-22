<template>
  <section class="mt-16 text-center">
    <template v-if="error.statusCode === 404">
      <h1 class="text-4xl font-bold text-primary-dark">404</h1>
      <div class="mt-8">Désolé ! Une erreur est survenue.</div>
      <InsameeAppButton empty :to="{ name: 'tutorat' }" class="block mt-4"
        >Regarder les tutorats actuels ?</InsameeAppButton
      >
    </template>
    <template v-else>
      <h1>Il semble qu'une erreur soit survenue !</h1>
      <InsameeAppButton large class="w-full mt-8" :to="{ name: 'index' }"
        >Accueil</InsameeAppButton
      >
      <InsameeAppButton border class="w-full mt-8" @click="show = !show"
        >En savoir plus</InsameeAppButton
      >
      <pre v-if="show" class="mt-8 overflow-x-auto text-left">{{ error }}</pre>
    </template>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>
