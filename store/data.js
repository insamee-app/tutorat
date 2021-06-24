export const state = () => ({
  subjects: undefined,
  currentRoles: [
    { id: 'étudiant', name: 'étudiant' },
    { id: 'personnel', name: 'personnel' },
  ],
  tutoratPosts: undefined,
  userTutoratPosts: undefined,
})

export const mutations = {
  setSubjects(state, subjects) {
    state.preferredSubjects = subjects
  },
  setTutoratPosts(state, tutoratPosts) {
    state.tutoratPosts = tutoratPosts
  },
  setUserTutoratPosts(state, userTutoratPosts) {
    state.userTutoratPosts = userTutoratPosts
  },
}
