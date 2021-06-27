export const state = () => ({
  tutorats: {
    limit: '5',
    page: 1,
    type: undefined,
    subject: undefined,
    currentRole: undefined,
    school: undefined,
    tile: undefined,
  },
})

export const mutations = {
  setFilter(state, { name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.tutorats).includes(name)) state.tutorats[name] = value
  },
}

export const getters = {
  getSearchParams({ tutorats }) {
    const data = {}
    for (const property in tutorats) {
      if (tutorats[property]) data[property] = tutorats[property]
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
}
