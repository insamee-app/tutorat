export default async ({ $axios, store }) => {
  try {
    const { data } = await $axios.get('/api/v1/profiles/me?populate=tutorat', {
      withCredentials: true,
    })
    store.dispatch('auth/login', data)
  } catch (error) {}
}
