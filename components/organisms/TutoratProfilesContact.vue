<script>
export default {
  name: 'TutoratProfilesContact',
  props: {
    isOffer: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
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
    mailto() {
      return `${this.contact}?subject=Tutorat%20:%20${this.title.toUpperCase()}`
    },
  },
}
</script>

<template>
  <InsameeAppButton
    :href="mailto"
    :loading="$fetchState.pending"
    :variant="variant"
    :disabled="$fetchState.pending || $fetchState.error"
  >
    {{ message }}
  </InsameeAppButton>
</template>
