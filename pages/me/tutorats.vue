<template>
  <InsameeResponsiveList
    :full-filters="lgAndUp"
    :action-filters="mdAndDown"
    :total-pagination="paginationTotal"
    :loading="$fetchState.pending"
  >
    <template #title>
      <h1 class="text-lg font-bold">Mes tutorats</h1>
    </template>
    <template #filters-full="{ classNames }">
      <FiltersCard :class="classNames" @submit="refreshFilters" />
    </template>
    <template #cards="{ loading }">
      <InsameeResponsiveListCards :loading="loading">
        <template #skeletons>
          <InsameeSkeletonCard
            v-for="value in 20"
            :key="value"
            variant="tutorat"
          />
        </template>
        <template #cards>
          <TutoratCard
            v-for="tutorat in tutorats"
            :id="tutorat.id"
            :key="tutorat.id"
            :subject-name="tutorat.subject.name"
            :school-name="tutorat.school.name"
            :type="tutorat.type"
            :time="tutorat.time"
            :text="tutorat.short_text"
            :avatar-url="tutorat.profile.avatar_url"
            :first-name="tutorat.profile.first_name"
            :last-name="tutorat.profile.last_name"
            :current-role="tutorat.profile.current_role"
            :siting="tutorat.siting"
            :interested-count="tutorat.users_interested_count"
          />
        </template>
      </InsameeResponsiveListCards>
    </template>
    <template #error>
      <div class="space-y-2 mt-4">
        <p class="font-bold">
          Désolé, aucun tutorat ne correspond à ta recherche...
        </p>
        <p>
          Mais si tu penses que c’est une erreur de notre part, tu peux nous
          contacter pour palier à ce problème.
        </p>
        <p>
          Tu peux aussi créer
          <InsameeAppButton :to="{ name: 'tutorats-create' }" inline empty>
            ton propre tutorat !
          </InsameeAppButton>
        </p>
      </div>
      <div class="mt-8">
        <InsameeAppButton empty :to="{ name: 'contact' }">
          Nous contacter ?
        </InsameeAppButton>
      </div>
    </template>
    <template #filters-action>
      <InsameeAppButton shadow variant="secondary" @click="modalFilters = true">
        {{ filterMessage }}
      </InsameeAppButton>
      <InsameeAppModal :value="modalFilters" @outside="modalFilters = $event">
        <FiltersCard
          closable
          @submit="refreshFilters"
          @close="modalFilters = !$event"
        />
      </InsameeAppModal>
    </template>
    <template #pagination="{ classNames }">
      <InsameeResponsiveListPagination :class="classNames">
        <InsameePagination
          :small="mdAndDown"
          :previous-page="
            pagination.previous_page_url
              ? pagination.current_page - 1
              : undefined
          "
          :next-page="
            pagination.next_page_url ? pagination.current_page + 1 : undefined
          "
          :first-page="pagination.first_page"
          :current-page="pagination.current_page"
          :last-page="pagination.last_page"
          @pagination="refreshPagination"
        />
      </InsameeResponsiveListPagination>
    </template>
  </InsameeResponsiveList>
</template>

<script>
import { mapState } from 'vuex'
import getTexts from '@/mixins/getTexts'

export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  data() {
    return {
      modalFilters: false,
      tutorats: [],
      pagination: undefined,
    }
  },
  async fetch() {
    const query = this.$store.getters['filters/getSearchParams']('tutoratsMy')
    const path = `/api/v1/profiles/${this.profile.user_id}/tutorats?${query}`

    const { data } = await this.$axios.get(path)

    this.tutorats = data.data
    this.pagination = data.meta
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    mdAndDown() {
      return !this.$screen.lg
    },
    lgAndUp() {
      return this.$screen.lg
    },
    paginationTotal() {
      return this.pagination ? this.pagination.total : 0
    },
    filterMessage() {
      return this.paginationTotal
        ? 'Rechercher par filtres'
        : "Essayer d'autres filtres"
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
    parseUrl() {
      this.$store.commit('filters/resetFilters', 'tutoratsMy')
      for (const query in this.$route.query) {
        const value = this.$route.query[query]
        this.$store.commit('filters/setPagination', {
          pagination: 'tutoratsMy',
          name: query,
          value,
        })

        this.$store.commit('filters/setFilters', {
          filter: 'tutoratsMy',
          name: query,
          // With one number, *[] value is a single value and not an array, so we need to convert it
          value:
            query.includes('[]') && !Array.isArray(value) ? [value] : value,
        })
      }
    },
    refreshPagination(value) {
      this.$store.commit('filters/setPagination', {
        pagination: 'tutoratsMy',
        name: 'page',
        value,
      })
      this.setRoute()
    },
    refreshFilters(data) {
      this.modalFilters = false
      for (const iterator in data) {
        const value = data[iterator]
        this.$store.commit('filters/setFilters', {
          filter: 'tutoratsMy',
          name: iterator,
          value,
        })
      }
      this.setRoute()
    },
    setRoute() {
      const query = this.$store.getters['filters/getSearchParams']('tutoratsMy')
      this.$router.push({
        path: `/me/tutorats?${query}`,
      })
    },
  },
}
</script>
