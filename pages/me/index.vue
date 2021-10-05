<template>
  <InsameeAppContainer class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-xl font-bold">Mon Profil</h1>
    <InsameeTutoratProfile
      :last-name="profile.last_name"
      :first-name="profile.first_name"
      :email="profile.user.email"
      :school-name="profile.school.name"
      :graduation-year="profile.graduation_year"
      :current-role="profile.current_role"
      :avatar-url="profile.avatarUrl"
      :text="profile.tutorat_profile.text"
      :preferred-subjects="getTexts(profile.tutorat_profile.preferred_subjects)"
      :difficulties-subjects="
        getTexts(profile.tutorat_profile.difficulties_subjects)
      "
    >
      <InsameeProfileContact :links="socials" />
    </InsameeTutoratProfile>
    <section class="flex justify-end sticky bottom-4">
      <InsameeAppButton shadow border large @click="editProfile = true">
        Editer le profil
      </InsameeAppButton>
    </section>
    <section class="space-y-4">
      <h2 class="text-xl font-bold">Les tutorats</h2>
      <div class="flex flex-col items-end space-y-4">
        <InsameeAppButton border large :to="{ name: 'me-tutorats' }">
          Mes tutorats
        </InsameeAppButton>
      </div>
    </section>
    <section class="space-y-4">
      <h2 class="text-xl font-bold">Paramètre du compte</h2>
      <div class="space-y-4">
        <InsameeLabeledCheck
          :value="profile.user.email_interested_tutorat"
          class="mt-2"
          name="rememberMe"
          title="Cela me permet d'être informé des offres qui pourrait m'intéresser"
          label="Je souhaite être notifié par mail lorsqu'une offre qui correspond à une demande à laquelle j'ai montré mon intérêt est créée"
          @change="sendEmailInterestedTutorat"
        />
        <InsameeAppError :error-message="errorMessage" />
        <div>
          <InsameeAppLink :link="`${$config.insameeURL}/mee`">
            Se rendre sur insamee.fr
          </InsameeAppLink>
        </div>
      </div>
    </section>
    <InsameeAppModal
      v-slot="{ size }"
      :value="editProfile"
      overflow
      @outside="editProfile = false"
    >
      <UserProfileForm
        :class="size"
        :user-id="profile.user_id"
        @close="editProfile = false"
      />
    </InsameeAppModal>
  </InsameeAppContainer>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import getTexts from '@/mixins/getTexts'

export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  data() {
    return {
      editProfile: false,
      loading: false,
      errorMessage: '',
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
  methods: {
    async sendEmailInterestedTutorat(value) {
      if (this.loading) {
        return
      }

      this.loading = true
      try {
        const { data } = await this.$axios.patch(
          `/api/v1/users/${this.profile.user_id}?platform=tutorat`,
          {
            emailInterestedTutorat: value,
          }
        )
        this.$store.commit('auth/setUser', data)
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue'
      }
      this.loading = false
    },
  },
}
</script>
