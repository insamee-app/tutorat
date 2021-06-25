export const state = () => ({
  tutoratsQuery: {
    limit: '5',
    page: 1,
    type: undefined,
    subject: undefined,
    currentRole: undefined,
    school: undefined,
    duration: undefined,
  },
})

export const mutations = {
  setTutoratsFilter(state, { name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.tutoratsQuery).includes(name))
      state.tutoratsQuery[name] = value
  },
  resetTutoratFilter(state) {
    state.tutoratsQuery = {
      limit: '5',
      page: 1,
      type: undefined,
      subject: undefined,
      currentRole: undefined,
      school: undefined,
      duration: undefined,
    }
  },
}
export const getters = {
  getUsersSearchParams({ tutoratsQuery }) {
    const data = {}
    for (const property in tutoratsQuery) {
      if (tutoratsQuery[property]) data[property] = tutoratsQuery[property]
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
}
