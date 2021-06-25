export const state = () => ({
  subjects: undefined,
  schools: undefined,
  currentRoles: [
    { id: 'étudiant', name: 'étudiant' },
    { id: 'personnel', name: 'personnel' },
  ],
  tutoratTypes: [
    { id: 'offre', name: 'offre' },
    { id: 'demande', name: 'demande' },
  ],
  tutoratPosts: undefined,
  userTutoratPosts: undefined,
})

export const mutations = {
  setSubjects(state, subjects) {
    state.preferredSubjects = subjects
  },
  setSchools(state, schools) {
    state.schools = schools
  },
  setTutoratPosts(state, tutoratPosts) {
    state.tutoratPosts = tutoratPosts
  },
  setUserTutoratPosts(state, userTutoratPosts) {
    state.userTutoratPosts = userTutoratPosts
  },
}
