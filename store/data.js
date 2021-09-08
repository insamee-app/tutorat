export const state = () => ({
  subjects: [],
  schools: [],
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
