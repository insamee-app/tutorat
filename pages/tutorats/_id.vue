<template>
  <InsameeAppContainer class="mx-auto space-y-8 overflow-hidden" small>
    <TutoratInformation :tutorat="tutorat" :is-creator="isCreator" />
    <TutoratActions
      :first-name="firstName"
      :is-offer="isOffer"
      :is-creator="isCreator"
      :socials="socials"
    >
      <template #graphic>
        <div
          class="
            absolute
            transform
            -translate-x-1/2
            left-1/2
            -top-3/4
            md:top-1/4
            z-0
            opacity-40
          "
        >
          <GraphicOffer v-if="isOffer" />
          <GraphicDemand v-else />
        </div>
      </template>
    </TutoratActions>
    <div v-if="isCreator">
      <div
        v-if="isOffer && $fetchState.pending"
        class="grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2"
      >
        <InsameeSkeletonCard
          v-for="value in $store.state.filters.pagination.profiles.limit"
          :key="value"
        />
      </div>
      <InsameeAppError
        v-else-if="isOffer && $fetchState.error"
        :error-message="errorMessage"
      />
      <TutoratProfiles
        v-else-if="isOffer"
        :title="tutorat.subject.name"
        :profiles="profiles"
        :pagination="pagination"
        :tutorat-type="tutorat.type"
        class="relative"
        @pagination="refreshProfilesPagination"
      />
    </div>
  </InsameeAppContainer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(
      `/api/v1/tutorats/${params.id}?platform=tutorat&serialize=full`
    )

    return { tutorat: data }
  },
  data() {
    return {
      profiles: [],
      pagination: {},
    }
  },
  async fetch() {
    if (!this.isCreator || !this.isOffer) return

    const id = this.tutorat.id
    const query = this.$store.getters['filters/getProfilesSearchParams']
    const path = `/api/v1/tutorats/${id}/interested/profiles?${query}`

    const { data } = await this.$axios.get(path)

    this.profiles = data.data
    this.pagination = data.meta
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    firstName() {
      return this.tutorat.profile.first_name ?? ''
    },
    socials() {
      return {
        facebook: this.tutorat.profile.url_facebook,
        instagram: this.tutorat.profile.url_instagram,
        twitter: this.tutorat.profile.url_twitter,
        mobile: this.tutorat.profile.mobile,
      }
    },
    isOffer() {
      return this.tutorat.type === 'offre'
    },
    isDemand() {
      return this.tutorat.type === 'demande'
    },
    isCreator() {
      return this.tutorat.user_id === this.profile.user_id
    },
    errorMessage() {
      return "Une error est survenue dans le chargement des profils. Si l'erreur persiste, n'hésitez pas à nous contacter"
    },
  },
  watch: {
    '$route.query'() {
      this.parseUrl()
      this.$fetch()
    },
  },
  beforeMount() {
    this.parseUrl()
  },
  methods: {
    refreshProfilesPagination(value) {
      this.$store.commit('filters/setPagination', {
        pagination: 'profiles',
        name: 'page',
        value,
      })
      this.setRoute()
    },
    parseUrl() {
      for (const query in this.$route.query) {
        const value = this.$route.query[query]
        this.$store.commit('filters/setPagination', {
          pagination: 'profiles',
          name: query,
          value,
        })
      }
    },
    setRoute() {
      const query = this.$store.getters['filters/getProfilesSearchParams']
      this.$router.push({
        path: `/tutorats/${this.$route.params.id}?${query}`,
      })
    },
  },
}
</script>
