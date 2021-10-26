<script>
export default {
  head() {
    return {
      title: `Créer un tutorat`,
    }
  },
  methods: {
    changePage(data) {
      this.$router.push({ name: 'tutorats-id', params: { id: data.id } })
    },
  },
}
</script>

<template>
  <InsameeAppContainer>
    <h1 class="text-xl font-bold">Créer un tutorat</h1>
    <TutoratForm class="max-w-md mx-auto" @success="changePage" />
  </InsameeAppContainer>
</template>
