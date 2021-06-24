<template>
  <InsameeAppCard class="border shadow-lg rounded-xl hover:shadow-xl">
    <template #header>
      <InsameeAppCardHeader>
        <div class="flex flex-col justify-between">
          <div
            v-if="tutoratProfile.type == 'offre'"
            class="text-xl font-bold truncate"
          >
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
      <div class="flex justify-end">
        <InsameeAppButton
          :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
          :to="`/tutorat/${tutoratProfile.user_id}`"
          >Voir plus</InsameeAppButton
        >
      </div>
    </template>
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'AppCardTutorat',
  props: {
    tutoratProfile: {
      require: true,
      type: Object,
      default: () => {},
    },
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
