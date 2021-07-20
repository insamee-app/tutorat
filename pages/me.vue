<template>
  <div>
    <InsameeAppContainer class="max-w-4xl mx-auto">
      <h1 class="text-xl font-bold mt-4">Mon Profil</h1>
      <InsameeTutoratProfile
        class="mt-4"
        :last-name="profile.last_name"
        :first-name="profile.first_name"
        :email="profile.user.email"
        :school-name="profile.school.name"
        :graduation-year="profile.graduation_year"
        :current-role="profile.current_role"
        :avatar-url="profile.avatarUrl"
        :text="profile.tutoratProfile.text"
        :preferred-subjects="getTexts(profile.tutoratProfile.preferredSubjects)"
        :difficulties-subjects="
          getTexts(profile.tutoratProfile.difficultiesSubjects)
        "
      >
        <InsameeProfileContact :links="socials" />
        <!-- <InsameeLabeledItem label="Mes demandes et mes offres">
          <section class="space-y-4">
            <div class="flex flex-row w-full pt-4 justify-evenly">
              <InsameeAppButton
                large
                :disabled="loading"
                :loading="loading"
                variant="secondary"
                @click="toShow = 'demande'"
              >
                Demandes
              </InsameeAppButton>
              <InsameeAppButton
                large
                :disabled="loading"
                :loading="loading"
                @click="toShow = 'offre'"
              >
                Offres
              </InsameeAppButton>
            </div>
            <InsameeResponsiveListCards v-if="toShow">
              <template v-if="loading">
                <InsameeSkeletonCard v-for="value in limit" :key="value" />
              </template>
              <template v-else-if="pagination && pagination.total">
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
                    v-if="!loading"
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
          </section>
        </InsameeLabeledItem> -->
      </InsameeTutoratProfile>
      <!-- <section class="flex justify-between sticky bottom-4 mt-8">
        <InsameeAppButton large @click="createTutorat = true">
          Créer un tutorat
        </InsameeAppButton>
        <InsameeAppButton large @click="editProfile = true">
          Editer le profil
        </InsameeAppButton>
      </section> -->
      <section>
        <h2 class="text-xl font-bold mt-8">Paramètre du compte</h2>
        <div class="text-center mt-4">
          <InsameeAppLink :link="`${$config.insameeURL}/mee`">
            Se rendre sur mon profil principal
          </InsameeAppLink>
        </div>
      </section>
    </InsameeAppContainer>
    <InsameeAppModal
      v-slot="{ size }"
      v-model="editProfile"
      v-scroll-lock="editProfile"
      @outside="editProfile = false"
    >
      <UserProfileForm
        :class="size"
        :user-id="profile.user_id"
        @close="editProfile = false"
      />
    </InsameeAppModal>
    <InsameeAppModal
      v-slot="{ size }"
      v-model="createTutorat"
      v-scroll-lock="createTutorat"
      @outside="createTutorat = false"
    >
      <CreateTutoratForm :class="size" @close="createTutorat = false" />
    </InsameeAppModal>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import getTexts from '@/mixins/getTexts'

export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  data() {
    return {
      loading: false,
      pagination: undefined,
      limit: 6,
      page: 1,
      toShow: undefined,
      tutorats: [],
      createTutorat: false,
      editProfile: false,
      errors: [],
    }
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    ...mapGetters({ socials: 'auth/socialNetworks' }),
    mdAndDown() {
      return !this.$screen.lg
    },
    lgAndUp() {
      return this.$screen.lg
    },
  },
  watch: {
    toShow() {
      this.fetch()
    },
  },
  methods: {
    async refresh(value) {
      this.page = value
      await this.fetch()
    },
    async fetch() {
      this.loading = true
      try {
        const response = await this.$axios.get(
          `/api/v1/profiles/${this.profile.user_id}/tutorats?type=${this.toShow}&limit=${this.limit}&page=${this.page}`
        )

        this.tutorats = response.data.data
        this.pagination = response.data.meta
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
  },
}
</script>
