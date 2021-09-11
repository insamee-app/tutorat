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
      <h2 class="text-xl font-bold">Paramètre du compte</h2>
      <div class="text-center space-y-4">
        <InsameeAppLink :link="`${$config.insameeURL}/mee`">
          Se rendre sur insamee.fr
        </InsameeAppLink>
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
}
</script>
