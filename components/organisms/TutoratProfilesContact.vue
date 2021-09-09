<script>
export default {
  name: 'TutoratProfilesContact',
  props: {
    isOffer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      contact: '',
    }
  },
  async fetch() {
    const { id } = this.$route.params
    const { data } = await this.$axios.get(
      `/api/v1/tutorats/${id}/interested/contacts`
    )

    this.contact = data.mailto
  },
  computed: {
    message() {
      if (this.$fetchState.error) {
        return 'Une erreur est survenue'
      }

      return 'Tout Contacter'
    },
    variant() {
      return this.isOffer ? 'primary' : 'secondary'
    },
  },
}
</script>

<template>
  <InsameeAppButton
    :href="contact"
    :loading="$fetchState.pending"
    :variant="variant"
    :disabled="$fetchState.pending || $fetchState.error"
  >
    {{ message }}
  </InsameeAppButton>
</template>
