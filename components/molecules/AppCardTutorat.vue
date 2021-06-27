<template>
  <InsameeAppCard class="border shadow-lg rounded-xl hover:shadow-xl">
    <template #header>
      <InsameeAppCardHeader>
        <div class="flex flex-col justify-between">
          <div class="text-xl font-bold truncate">
            <span
              :class="
                tutoratProfile.type === 'offre'
                  ? 'text-primary-dark'
                  : 'text-secondary-dark'
              "
              >{{ capitalizeFirstLetter(tutoratProfile.type) }}</span
            >
            |
            {{ capitalizeFirstLetter(tutoratProfile.subject.name) }}
          </div>
          <div class="font-light">{{ tutoratProfile.school.name }}</div>
        </div>
      </InsameeAppCardHeader>
    </template>

    <InsameeAppCardContent justify>
      <div class="flex flex-row mb-6">
        <InsameeAppProfileAvatar
          :link="tutoratProfile.profile.avatar"
          size="small"
          :variant="tutoratProfile.type == 'demande' ? 'secondary' : 'primary'"
          :label="tutoratProfile.currentRole"
        />
        <div class="grid items-center grid-rows-2 gap-0 ml-4 font-bold">
          <span>{{ tutoratProfile.profile.first_name }}</span>
          <span>{{ tutoratProfile.profile.last_name }}</span>
        </div>
      </div>
      <span v-if="tutoratProfile.type == 'offre'"
        ><span class="font-bold">{{ minToHours(tutoratProfile.time) }}</span>
        -
      </span>
      {{ tutoratProfile.text }}</InsameeAppCardContent
    >
    <template #actions>
      <div class="flex justify-between">
        <InsameeAppButton
          :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
          :to="{
            name: 'tutorat-id',
            params: {
              id: tutoratProfile.id,
            },
          }"
          >Voir plus</InsameeAppButton
        >
        <InsameeAppButton
          v-if="profile.user_id === tutoratProfile.user_id"
          :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
          @click="toggleEdit = true"
          >Editer</InsameeAppButton
        >
      </div>
    </template>
    <InsameeAppModal
      v-model="toggleEdit"
      v-scroll-lock="toggleEdit"
      @outside="toggleEdit = false"
    >
      <EditTutoratForm
        :tutorat-text="tutoratProfile.text"
        :tutorat-time="tutoratProfile.time"
        :tutorat-id="tutoratProfile.id"
        @close="toggleEdit = false"
        @refresh="$emit('refresh')"
      />
    </InsameeAppModal>
  </InsameeAppCard>
</template>

<script>
// on doit utiliser le fetchData pour rendre ces cartes autonomes et ne fetch qu'une fois
import { mapState } from 'vuex'
export default {
  name: 'AppCardTutorat',
  props: {
    tutoratProfile: {
      require: true,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      toggleEdit: false,
    }
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
  },
  methods: {
    minToHours(minAmount) {
      const hours = Math.floor(minAmount / 60)
      const minutes = minAmount % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>

<style></style>
