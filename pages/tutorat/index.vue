<template>
  <InsameeIconSpinner
    v-if="tutoratPosts === undefined"
    class="w-1/2 my-4 fill-current h-1/2 animate-spin text-primary-dark"
  />
  <InsameeResponsiveList v-else>
    <template #filter>
      <div class="flex flex-row justify-between w-full">
        <AppSelect
          :items="itemsPerPage"
          name="itemsPerPage"
          @input="setItemPerPage"
        />
        <TutoratFilters />
      </div>
    </template>
    <template #cards>
      <InsameeResponsiveListCards>
        <AppCardTutorat
          v-for="tutortProfile in tutoratPosts.data"
          :key="tutortProfile.id"
          :tutorat-profile="tutortProfile"
        />
        <template #pagination>
          <InsameeResponsiveListPagination>
            <InsameePagination
              small
              :last-page="tutoratPosts.meta.last_page"
              :first-page="tutoratPosts.meta.first_page"
              :current-page="tutoratPosts.meta.current_page"
              :previous-page="getPage(tutoratPosts.meta.previous_page_url)"
              :next-page="getPage(tutoratPosts.meta.next_page_url)"
              @pagination="paginate"
            />
          </InsameeResponsiveListPagination>
        </template>
      </InsameeResponsiveListCards>
    </template>
  </InsameeResponsiveList>
</template>

<script>
import { mapState } from 'vuex'
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
    }
  },
  async fetch() {
    const params = this.$store.getters['filters/getUsersSearchParams']
    const response = await this.$axios.get(`/api/v1/tutorats?${params}`, {
      withCredentials: true,
    })
    this.$store.commit('data/setTutoratPosts', response.data)
  },
  computed: {
    ...mapState({ tutoratPosts: (state) => state.data.tutoratPosts }),
  },
  watch: {
    '$route.query'() {
      this.parseUrl()
      this.$fetch()
    },
  },
  beforeMounted() {
    this.parseUrl()
  },
  fetchOnServer: false,
  methods: {
    parseUrl() {
      for (const query in this.$route.query) {
        this.$store.commit('filters/setTutoratsFilter', {
          name: query,
          value: this.$route.query[query],
        })
      }
    },
    fetch() {
      this.$fetch()
      const query = this.$store.getters['filters/getUsersSearchParams']
      this.$router.push({
        path: `/tutorat?${query}`,
      })
    },
    paginate(paginationValue) {
      this.$store.commit('filters/setTutoratsFilter', {
        name: 'page',
        value: paginationValue,
      })
      this.fetch()
    },
    getPage(value) {
      if (value != null) {
        const getNumber = /(?<number>\d+)/i
        const { groups } = getNumber.exec(value)
        return Number(groups.number)
      }
    },
    setItemPerPage(value) {
      this.$store.commit('filters/setTutoratsFilter', {
        name: 'page',
        value: 1,
      })
      this.$store.commit('filters/setTutoratsFilter', {
        name: 'limit',
        value,
      })
      console.log('value :', value)
      this.fetch()
    },
  },
}
</script>

<style></style>
