<template>
  <InsameeProfile
    :last-name="authorProfile.last_name"
    :first-name="authorProfile.first_name"
    :current-role="authorProfile.current_role"
    :graduation-year="authorProfile.graduation_year"
    :email="authorProfile.user.email"
    :school-name="authorProfile.school.name"
    :socials="socials"
    :difficulties-subjects="difficultiesSubjects"
    :preferred-subjects="preferredSubjects"
    :avatar-url="authorProfile.avatar"
    :text="authorProfile.tutoratProfile.text"
    variant="secondary"
  ></InsameeProfile>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ $axios, params }) {
    const authorProfile = await $axios.get(
      `/api/v1/profiles/${params.id}?populate=tutorat`,
      { withCredentials: true }
    )
    return { authorProfile: authorProfile.data }
  },
  computed: {
    preferredSubjects() {
      return this.authorProfile.tutoratProfile.preferredSubjects.map(
        (subject) => subject.name
      )
    },
    difficultiesSubjects() {
      return this.authorProfile.tutoratProfile.difficultiesSubjects.map(
        (subject) => subject.name
      )
    },
    socials() {
      return {
        url_facebook: this.authorProfile.url_facebook,
        url_instagram: this.authorProfile.url_instagram,
        url_twitter: this.authorProfile.url_twitter,
        mobile: this.authorProfile.mobile,
      }
    },
  },
}
</script>

<style></style>
