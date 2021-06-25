<template>
  <div>
    <InsameeAppContainer class="space-y-4">
      <InsameeProfileBasic
        :last-name="profile.last_name"
        :first-name="profile.first_name"
        :current-role="profile.current_role"
        :graduation-year="profile.graduation_year"
        :email="profile.user.email"
        :school-name="profile.school.name"
        :socials="socials"
        variant="secondary"
      ></InsameeProfileBasic>
      <InsameeLabeledItem label="Matières préférées">
        <InsameeAppChips
          class="pt-2"
          :texts="
            profile.tutoratProfile.preferredSubjects.map((subject) =>
              capitalizeFirstLetter(subject.name)
            )
          "
        ></InsameeAppChips>
      </InsameeLabeledItem>
      <InsameeLabeledItem label="Matières en difficulté" class="">
        <InsameeAppChips
          class="pt-2"
          :texts="
            profile.tutoratProfile.difficultiesSubjects.map((subject) =>
              capitalizeFirstLetter(subject.name)
            )
          "
        ></InsameeAppChips>
      </InsameeLabeledItem>
      <InsameeLabeledItem label="Description">
        <div class="text-base text-justify">
          {{ desc }}
        </div>
      </InsameeLabeledItem>
      <InsameeLabeledItem label="Mes offres et demandes">
        <div class="flex flex-row w-full pt-4 justify-evenly">
          <InsameeAppButton large @click="showCards = 'offre'"
            >Offres</InsameeAppButton
          >
          <InsameeAppButton large @click="showCards = 'demande'"
            >Demandes</InsameeAppButton
          >
        </div>
      </InsameeLabeledItem>
      <InsameeProfileContact :links="socials" />
      <div class="flex justify-end mb-4">
        <InsameeAppButton large @click="toggleEditProfile = true"
          >Editer le profil</InsameeAppButton
        >
      </div>
      <h1 class="text-xl font-bold">Paramètre du compte</h1>
      <div class="text-center">
        <InsameeAppLink :link="`${$config.baseInsameeUrl}/mee`"
          >Se rendre sur insamee.fr</InsameeAppLink
        >
      </div>
    </InsameeAppContainer>
    <InsameeAppModal
      v-model="toggleEditProfile"
      v-scroll-lock="toggleEditProfile"
      @outside="toggleEditProfile = false"
    >
      <UserProfileForm
        :user-id="profile.user_id"
        @close="toggleEditProfile = false"
      />
    </InsameeAppModal>
    <InsameeAppModal
      v-model="cardsModalOpen"
      v-scroll-lock="cardsModalOpen"
      @outside="showCards = undefined"
    >
      <AppCardTutoratList
        class="w-72"
        :tutorat-posts="filteredTutoratPosts"
        :type="showCards"
        @close="showCards = undefined"
        @refresh="refetchData"
      />
    </InsameeAppModal>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  data() {
    return {
      toggleEditProfile: false,
      showCards: undefined,
      errors: [],
    }
  },
  computed: {
    ...mapState({
      profile: (state) => state.auth.profile,
      tutoratPosts: (state) => state.data.userTutoratPosts,
    }),
    ...mapGetters({ socials: 'auth/socialNetworks' }),
    desc() {
      return this.profile.tutoratProfile.text === ''
        ? 'Non Renseignée'
        : this.profile.tutoratProfile.text
    },
    cardsModalOpen() {
      return !!this.showCards
    },
    filteredTutoratPosts() {
      return this.showCards !== undefined
        ? this.tutoratPosts?.filter(
            (tutorat) => tutorat.type === this.showCards
          )
        : []
    },
    // preferredSubjects() {
    //   return (
    //     this.profile.tutoratProfile?.preferredSubjects ?? [
    //       { name: 'Non reseignées' },
    //     ]
    //   )
    // },
    // difficultiesSubjects() {
    //   return (
    //     this.profile.tutoratProfile?.difficultiesSubjects ?? [
    //       { name: 'Non renseignées' },
    //     ]
    //   )
    // },
  },
  async mounted() {
    await this.refetchData()
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    async refetchData() {
      const tutoratPosts = await this.$axios.get(`/api/v1/tutorats`, {
        withCredentials: true,
      })
      this.$store.commit(
        'data/setUserTutoratPosts',
        tutoratPosts.data.filter(
          (tutorat) =>
            tutorat.user_id === this.$store.state.auth.profile.user_id
        )
      )
    },
  },
}
</script>

<style></style>
