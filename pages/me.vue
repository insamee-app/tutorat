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
        <InsameeLabeledItem label="Mes demandes et mes offres">
          <div class="flex flex-row w-full pt-4 justify-evenly">
            <InsameeAppButton
              large
              variant="secondary"
              @click="showCards = 'demande'"
            >
              Demandes
            </InsameeAppButton>
            <InsameeAppButton large @click="showCards = 'offre'">
              Offres
            </InsameeAppButton>
          </div>
        </InsameeLabeledItem>
      </InsameeTutoratProfile>
      <section class="flex justify-between sticky bottom-4 mt-8">
        <InsameeAppButton large @click="createTutorat = true">
          Créer un tutorat
        </InsameeAppButton>
        <InsameeAppButton large @click="editProfile = true">
          Editer le profil
        </InsameeAppButton>
      </section>
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
      createTutorat: false,
      editProfile: false,
      errors: [],
    }
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    ...mapGetters({ socials: 'auth/socialNetworks' }),
    cardsModalOpen() {
      return !!this.showCards
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
  methods: {
    async refetchData() {
      // Il faut placer ça dans un composant pour que ça soit fetch que au v-if et on le met dans le store pour faire comme dans insamee
      // const tutoratPosts = await this.$axios.get(
      //   `/api/v1/profiles/${id}/tutorats`,
      //   {
      //     withCredentials: true,
      //   }
      // )
    },
  },
}
</script>
