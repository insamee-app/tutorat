export const state = () => ({
  subjects: [],
  schools: [],
})

export const mutations = {
  set(state, { name, value }) {
    state[name] = value
  },
}

export const actions = {
  async fetch({ state, commit }, name) {
    if (!state[name].length) {
      const { data } = await this.$axios.get(`/api/v1/${name}?serialize=filter`)
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
}
