export const state = () => ({
  subjects: [],
  schools: [],
  currentRoles: [
    { id: 'étudiant', name: 'étudiant' },
    { id: 'personnel', name: 'personnel' },
  ],
  types: [
    { id: 'offre', name: 'offre' },
    { id: 'demande', name: 'demande' },
  ],
  siting: [
    { id: 'en présence', name: 'en présence' },
    { id: 'à distance', name: 'à distance' },
  ],
  time: [
    ...Array(6)
      .fill(0)
      .map((_, i) => {
        const time = String((i + 1) * 30)
        return {
          id: time,
          name: time,
        }
      }),
  ],
  reasonsTutorats: [],
  reasonsProfiles: [],
})

export const mutations = {
  set(state, { name, value }) {
    state[name] = value
  },
}

export const actions = {
  async fetch({ state, commit }, name) {
    const endpoint = name.includes('reasons')
      ? `/api/v1/reasons?resource=${name.replace('reasons', '').toLowerCase()}`
      : `/api/v1/${name}?serialize=filter&platform=associations`
    if (!state[name].length) {
      const { data } = await this.$axios.get(endpoint)
      commit('set', { name, value: data })
    }
  },
}

export const getters = {
  subjects(state) {
    return state.subjects.map((subject) => ({
      text: subject.name,
      value: subject.id,
    }))
  },
  schools(state) {
    return state.schools.map((school) => ({
      text: school.name,
      value: school.id,
    }))
  },
  currentRoles(state) {
    return state.currentRoles.map((role) => ({
      text: role.name,
      value: role.id,
    }))
  },
  types(state) {
    return state.types.map((type) => ({
      text: type.name,
      value: type.id,
    }))
  },
  siting(state) {
    return state.siting.map((s) => ({
      text: s.name,
      value: s.id,
    }))
  },
  time(state) {
    return state.time.map((t) => ({
      text: t.name,
      value: t.id,
    }))
  },
  reasonsTutorats(state) {
    return state.reasonsTutorats.map((reason) => ({
      text: reason.name,
      value: reason.id,
    }))
  },
  reasonsProfiles(state) {
    return state.reasonsProfiles.map((reason) => ({
      text: reason.name,
      value: reason.id,
    }))
  },
}
