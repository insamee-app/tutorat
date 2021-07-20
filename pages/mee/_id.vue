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
      getTexts(profile.tutoratProfile.difficultiesSubjects)
    "
    :preferred-subjects="getTexts(profile.tutoratProfile.preferredSubjects)"
    :avatar-url="profile.avatar"
    :text="profile.tutoratProfile.text"
    variant="secondary"
  />
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
        `${path}/${id}?populate=tutorat`
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
      }
    },
  },
}
</script>
