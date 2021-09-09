export const state = () => ({
  pagination: {
    profiles: {
      limit: 6,
      page: 1,
    },
    tutorats: {
      page: 1,
    },
  },
  filters: {
    tutorats: {
      time: 0,
      'schools[]': [],
      'subjects[]': '',
      type: '',
      currentRole: '',
    },
  },
})

export const mutations = {
  setPagination(state, { pagination, name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.pagination[pagination]).includes(name))
      state.pagination[pagination][name] = value
  },
  setFilters(state, { filter, name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.filters[filter]).includes(name)) {
      if (Array.isArray(value))
        state.filters[filter][name] = value.map((v) => +v)
      else state.filters[filter][name] = value
    }
  },
  resetFilters(state) {
    state.filters.tutorats = {
      time: 0,
      'schools[]': [],
      'subjects[]': '',
      type: '',
      siting: '',
      currentRole: '',
    }
  },
}

export const getters = {
  getProfilesSearchParams({ pagination: { profiles } }) {
    const data = {}
    for (const property in profiles) {
      if (profiles[property]) data[property] = profiles[property]
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
  getTutoratsSearchParams({
    pagination: { tutorats: tutoratsPagination },
    filters: { tutorats: tutoratsFilters },
  }) {
    const searchParams = new URLSearchParams()
    // Pagination
    for (const property in tutoratsPagination) {
      const value = tutoratsPagination[property]
      if (value) searchParams.append(property, value)
    }
    // Filters
    for (const property in tutoratsFilters) {
      const value = tutoratsFilters[property]
      // Check for different types of values
      if (Array.isArray(value) && value.length > 0)
        value.forEach((v) => searchParams.append(property, v))
      else if (typeof value === 'string' && value)
        searchParams.append(property, value)
      else if (typeof value === 'number' && value)
        searchParams.append(property, value)
    }
    return searchParams.toString()
  },
  type({ filters: { tutorats } }) {
    return tutorats.type
  },
  time({ filters: { tutorats } }) {
    return tutorats.time
  },
  profileCurrentRole({ filters: { tutorats } }) {
    return tutorats.profileCurrentRole
  },
  subjects({ filters: { tutorats } }) {
    return tutorats['subjects[]']
  },
  schools({ filters: { tutorats } }) {
    return tutorats['schools[]']
  },
}
