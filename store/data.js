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
  profile: {
    tutorats: {
      offer: undefined,
      demand: undefined,
    },
  },
})

export const mutations = {
  setSubjects(state, subjects) {
    state.preferredSubjects = subjects
  },
  setSchools(state, schools) {
    state.schools = schools
  },
  setProfileTutorats(state, { type, value }) {
    state.profile.tutorats[type] = value
  },
}
