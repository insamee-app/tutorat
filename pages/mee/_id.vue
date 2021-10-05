<template>
  <InsameeMeeTutoratProfile
    :last-name="profile.last_name"
    :first-name="profile.first_name"
    :current-role="profile.current_role"
    :graduation-year="profile.graduation_year"
    :email="profile.user.email"
    :school-name="profile.school.name"
    :socials="socials"
    :difficulties-subjects="
      getTexts(profile.tutorat_profile.difficulties_subjects)
    "
    :preferred-subjects="getTexts(profile.tutorat_profile.preferred_subjects)"
    :text="profile.tutorat_profile.text"
    :avatar-url="profile.url_picture"
  >
    <template #report>
      <Report v-slot="{ on }" type="profiles">
        <InsameeAppButton empty variant="grey-secondary" v-on="on">
          Signaler le mee
        </InsameeAppButton>
      </Report>
    </template>
  </InsameeMeeTutoratProfile>
</template>

<script>
import getTexts from '@/mixins/getTexts'
export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  async asyncData({ params, $axios, error }) {
    const path = '/api/v1/profiles'
    const { id } = params

    try {
      const { data: profile } = await $axios.get(
        `${path}/${id}?populate=tutorat&platform=tutorat&serialize=full`
      )
      return {
        profile,
      }
    } catch (e) {
      error(e.response.data)
    }
  },
  computed: {
    socials() {
      return {
        facebook: this.profile.url_facebook,
        instagram: this.profile.url_instagram,
        twitter: this.profile.url_twitter,
        téléphone: this.profile.mobile,
        email: this.profile.user.email,
      }
    },
  },
}
</script>
