<script>
export default {
  name: 'Interested',
  data() {
    return {
      errorMessage: '',
      interested: false,
      loading: false,
    }
  },
  async fetch() {
    const { id } = this.$route.params
    try {
      const { data } = await this.$axios.get(`api/v1/tutorats/${id}/interested`)
      this.interested = data.interested
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue'
    }
  },
  methods: {
    async onClick() {
      const { id } = this.$route.params
      this.loading = true
      try {
        if (!this.interested) {
          // Used to add a new interested
          const { data } = await this.$axios.post(
            `api/v1/tutorats/${id}/interested`
          )
          this.interested = data.interested
        } else {
          // Used to delete an interested
          const { data } = await this.$axios.delete(
            `api/v1/tutorats/${id}/interested`
          )
          this.interested = data.interested
        }
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue'
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <div>
    <InsameeIconSpinner
      v-if="$fetchState.pending"
      class="h-6 w-6 text-grey-secondary-base fill-current animate-spin"
    />
    <div v-else-if="errorMessage" class="text-sm text-grey-secondary-base">
      {{ errorMessage }}
    </div>
    <slot
      v-else
      :on="{ click: onClick }"
      :interested="interested"
      :loading="loading"
    ></slot>
  </div>
</template>
