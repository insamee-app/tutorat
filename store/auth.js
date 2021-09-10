export const state = () => ({
  profile: undefined,
})

export const mutations = {
  setProfile(state, profile) {
    if (!profile) state.profile = undefined
    else {
      state.profile = profile
    }
  },
}

export const actions = {
  login({ commit }, profile) {
    commit('setProfile', profile)
  },
  async logout({ commit }) {
    await this.$axios.post('/auth/logout')
    commit('setProfile', undefined)
    this.$router.push({ name: 'index' })
  },
}

export const getters = {
  loggedIn({ profile }) {
    return !!profile
  },
  socialNetworks({ profile }) {
    return {
      facebook: profile.url_facebook,
      instagram: profile.url_instagram,
      twitter: profile.url_twitter,
      téléphone: profile.mobile,
    }
  },
  toUpdateProfile({ profile }) {
    return {
      lastName: profile.last_name ?? '',
      firstName: profile.first_name ?? '',
      currentRole: profile.current_role ?? '',
      text: profile.tutorat_profile.text ?? '',
      mobile: profile.mobile ?? '',
      preferredSubjects: profile.tutorat_profile?.preferred_subjects ?? [],
      difficultiesSubjects:
        profile.tutorat_profile?.difficulties_subjects ?? [],
      graduationYear: profile.graduation_year ?? '',
      urlFacebook: profile.url_facebook ?? '',
      urlInstagram: profile.url_instagram ?? '',
      urlTwitter: profile.url_twitter ?? '',
    }
  },
  preferredSubjects({ profile }) {
    return profile.tutorat_profile.preferred_subjects.map((el) => el.id)
  },
  difficultiesSubjects({ profile }) {
    return profile.tutorat_profile.difficulties_subjects.map((el) => el.id)
  },
  currentRole({ profile }) {
    return profile.current_role
  },
}
