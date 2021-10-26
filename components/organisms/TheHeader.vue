<template>
  <InsameeHeader
    :name-link="{ name: 'index' }"
    :icon-nav="!$screen.md"
    @open="$emit('open', $event)"
  >
    <template #name>
      <template v-if="$screen.md"> Tutorat </template>
      <template v-else>
        <NuxtImg
          src="/logos/tutorat.png"
          height="24"
          alt="logo de la plateforme tutorat"
        />
      </template>
    </template>
    <template #nav>
      <InsameeHeaderNav v-if="$screen.md">
        <InsameeAppList :list="nav" row />
      </InsameeHeaderNav>
    </template>
    <template #actions>
      <template v-if="loggedIn()">
        <InsameeAppButton :to="{ name: 'tutorats' }">
          Trouver des tutorats
        </InsameeAppButton>
        <AppTeam />
      </template>
      <InsameeAppButton
        v-if="!loggedIn() && $screen.md"
        empty
        variant="secondary"
        :to="{ name: 'login' }"
      >
        Se connecter
      </InsameeAppButton>
      <InsameeAppButton v-if="!loggedIn()" border :to="{ name: 'signup' }">
        S'inscrire
      </InsameeAppButton>
    </template>
  </InsameeHeader>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  props: {
    nav: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
  },
}
</script>
