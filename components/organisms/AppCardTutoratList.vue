<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle
          >Mes {{ `${capitalizeFirstLetter(type)}s` }}</InsameeAppCardTitle
        >
      </InsameeAppCardHeader>
      <InsameeAppCardContent
        ><div v-if="tutoratPosts.length" class="space-y-4">
          <AppCardTutorat
            v-for="(obj, index) in tutoratPosts"
            :key="index"
            :tutorat-profile="obj"
          />
        </div>
        <div v-else class="text-2xl text-center text-primary-base">
          Aucune {{ type }} crée !
        </div></InsameeAppCardContent
      >
    </template>
  </InsameeAppCard>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppCardTutoratList',
  props: {
    type: {
      required: true,
      type: String,
      default: undefined,
    },
    tutoratPosts: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>

<style></style>
