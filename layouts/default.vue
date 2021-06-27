<template>
  <div>
    <TheHeader :nav="navList" @open="toggleNav" />
    <main class="max-w-7xl mx-auto">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      nav: false,
    }
  },
  computed: {
    navList() {
      const nav = [
        {
          name: 'Trouver des mee',
          href: this.$config.insameeURL + '/mee',
        },
        {
          name: 'Trouver des associations',
          href: this.$config.associationsURL + '/associations',
        },
        {
          name: 'Contact',
          to: { name: 'contact' },
        },
      ]
      nav.unshift(
        this.loggedIn()
          ? {
              name: 'Mon profil',
              href: this.$config.insameeURL + '/me',
            }
          : { name: 'Acceuil', to: { name: 'index' } }
      )

      return nav
    },
  },
  watch: {
    $route() {
      this.nav = false
    },
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    toggleNav(state) {
      this.nav = state
    },
  },
}
</script>
