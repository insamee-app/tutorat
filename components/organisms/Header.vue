<template>
  <div>
    <InsameeHeader
      icon-nav
      :icon-link="{ name: 'index' }"
      @open="showSlider = true"
    >
      <template #actions>
        <InsameeAppButton v-if="!loggedIn()" border large primary>
          <InsameeAppLink :link="`${$config.baseInsameeUrl}/signin`"
            >S'inscrire</InsameeAppLink
          >
        </InsameeAppButton>
      </template>
    </InsameeHeader>
    <InsameeNavMobile
      :value="showSlider"
      :list="[
        {
          name: 'Accueil',
          to: { name: 'index' },
        },
        {
          name: 'Chercher un tutorat',
          to: { name: 'tutorat' },
        },
        {
          name: 'Mon profil',
          to: { name: 'mee' },
        },
        {
          name: 'Contact',
          to: { name: 'contact' },
        },
      ]"
      @close="showSlider = false"
    >
      <template v-if="!loggedIn()" #actions>
        <InsameeAppButton class="mr-4">
          <InsameeAppLink
            class="text-white"
            :link="`${$config.baseInsameeUrl}/signin`"
            >S'inscrire</InsameeAppLink
          >
        </InsameeAppButton>
        <InsameeAppButton primary border>
          <InsameeAppLink :link="`${$config.baseInsameeUrl}/login`"
            >Se connecter</InsameeAppLink
          >
        </InsameeAppButton>
      </template>
    </InsameeNavMobile>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      showSlider: false,
    }
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
  },
}
</script>

<style></style>
