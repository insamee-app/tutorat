export default async ({ $axios, store }) => {
  try {
    const { data } = await $axios.get('/api/v1/profiles/me?populate=tutorat')
    store.dispatch('auth/login', data)
  } catch (e) {}
}
