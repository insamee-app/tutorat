<template>
  <InsameeResponsiveList>
    <template #filter>
      <InsameeAppCard class="w-full">
        <div class="flex flex-row justify-between">
          <div class="flex">
            <span>item par page</span>
            <AppSelect
              v-model="itemPerPage"
              :items="itemsPerPage"
              name="itemsPerPage"
            />
          </div>
          <InsameeAppButton
            v-if="mdAndDown"
            variant="secondary"
            @click="filterDialog = true"
          >
            Filtrer
          </InsameeAppButton>
        </div>
      </InsameeAppCard>
      <InsameeAppCard v-if="lgAndUp" class="w-full">
        <InsameeAppCardTitle>Filtres</InsameeAppCardTitle>
        <FiltersTutorats />
        <template #actions>
          <div class="flex flex-row justify-end">
            <InsameeAppButton @click="validFilter">Valider</InsameeAppButton>
          </div>
        </template>
      </InsameeAppCard>
    </template>
    <template #cards>
      <InsameeResponsiveListCards>
        <template v-if="$fetchState.pending">
          <InsameeSkeletonCard
            v-for="value in +$store.state.filters.tutorats.limit"
            :key="value"
          />
        </template>
        <template v-else-if="pagination.total">
          <template v-if="tutorats.length">
            <TutoratCard
              v-for="tutorat in tutorats"
              :id="tutorat.id"
              :key="tutorat.id"
              :subject-name="tutorat.subject.name"
              :school-name="tutorat.school.name"
              :avatar-url="tutorat.profile.avatarUrl"
              :type="tutorat.type"
              :text="tutorat.text"
              :time="tutorat.time"
              :first-name="tutorat.profile.first_name"
              :last-name="tutorat.profile.last_name"
              :current-role="tutorat.profile.current_role"
              :user-id="$store.state.auth.profile.user_id"
              :owner-id="tutorat.profile.user_id"
            />
          </template>
          <template v-else>
            <div class="text-center text-lg col-span-2">
              Il semble que vous ne soyez pas sur la bonne page
            </div>
          </template>
        </template>
        <template v-else>
          <div class="text-center text-lg col-span-2">
            Il n'existe pas de tutorats pour votre recherche !
          </div>
        </template>
        <template v-if="pagination && pagination.total" #pagination>
          <InsameeResponsiveListPagination>
            <InsameePagination
              v-if="!$fetchState.pending"
              :small="mdAndDown"
              :previous-page="
                pagination.previous_page_url
                  ? pagination.current_page - 1
                  : undefined
              "
              :next-page="
                pagination.next_page_url
                  ? pagination.current_page + 1
                  : undefined
              "
              :first-page="pagination.first_page"
              :current-page="pagination.current_page"
              :last-page="pagination.last_page"
              @pagination="refresh"
            />
          </InsameeResponsiveListPagination>
        </template>
      </InsameeResponsiveListCards>
    </template>
    <template #modal>
      <InsameeAppModal
        v-if="mdAndDown"
        v-slot="{ size }"
        :value="filterDialog"
        @outside="filterDialog = false"
      >
        <InsameeAppCard closable :class="size" @close="filterDialog = false">
          <template #header>Filtres</template>
          <FiltersTutorats />
          <template #actions>
            <div class="flex flex-row justify-end">
              <InsameeAppButton @click="validFilter">Valider</InsameeAppButton>
            </div>
          </template>
        </InsameeAppCard>
      </InsameeAppModal>
    </template>
  </InsameeResponsiveList>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      filterDialog: false,
      itemsPerPage: [
        { name: '5', id: 5 },
        { name: '10', id: 10 },
        { name: '20', id: 20 },
      ],
      pagination: undefined,
      tutorats: [],
    }
  },
  async fetch() {
    const query = this.$store.getters['filters/getSearchParams']
    const path = '/api/v1/tutorats?' + query

    const { data } = await this.$axios.get(path)

    this.tutorats = data.data
    this.pagination = data.meta
  },
  computed: {
    mdAndDown() {
      return !this.$screen.lg
    },
    lgAndUp() {
      return this.$screen.lg
    },
    itemPerPage: {
      get() {
        return this.$store.state.filters.tutorats.limit
      },
      set(value) {
        this.$store.commit('filters/setFilter', { name: 'page', value: 1 })
        this.$store.commit('filters/setFilter', {
          name: 'limit',
          value,
        })
        this.setRoute()
      },
    },
  },
  watch: {
    '$route.query'() {
      this.parseUrl()
      this.$fetch()
      this.setRoute()
    },
  },
  beforeMount() {
    this.parseUrl()
  },
  fetchOnServer: false,
  methods: {
    validFilter() {
      this.setRoute()
      this.filterDialog = false
    },
    refresh(value) {
      this.$store.commit('filters/setFilter', {
        name: 'page',
        value,
      })
      this.setRoute()
    },
    parseUrl() {
      for (const query in this.$route.query) {
        const value = this.$route.query[query]
        this.$store.commit('filters/setFilter', {
          name: query,
          value,
        })
      }
    },
    setRoute() {
      const query = this.$store.getters['filters/getSearchParams']
      this.$router.push({
        path: `/tutorats?${query}`,
      })
    },
  },
}
</script>

<style></style>
