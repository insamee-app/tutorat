<template>
  <InsameeAppCard
    shadow
    reduced
    :to="{
      name: 'tutorats-id',
      params: {
        id,
      },
    }"
  >
    <template #header>
      <InsameeAppCardHeader class="w-full">
        <TutoratCardHeader
          class="w-full"
          :type="type"
          :school-name="schoolName"
          :subject-name="subjectName"
          :interested-count="interestedCount"
        />
      </InsameeAppCardHeader>
    </template>
    <InsameeAppCardContent justify>
      <TutoratCardProfile
        :type="type"
        :current-role="currentRole"
        :last-name="lastName"
        :first-name="firstName"
      />
      <div class="mt-4">
        <template v-if="isOffer">
          <span class="font-bold">{{ formatedTime }}</span>
          -
          <span class="font-bold capitalize">{{ siting }}</span>
          -
        </template>
        {{ text }}
      </div>
    </InsameeAppCardContent>
    <template #actions>
      <div class="flex justify-end">
        <InsameeAppButton :variant="isDemand ? 'secondary' : 'primary'">
          Voir plus
        </InsameeAppButton>
      </div>
    </template>
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'TutoratCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    subjectName: {
      type: String,
      default: '',
    },
    schoolName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    time: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    currentRole: {
      type: String,
      default: '',
    },
    interestedCount: {
      type: Number,
      default: 0,
    },
    siting: {
      type: String,
      default: '',
    },
  },
  computed: {
    isOffer() {
      return this.type === 'offre'
    },
    isDemand() {
      return this.type === 'demande'
    },
    formatedTime() {
      if (!this.isOffer) return

      const hours = Math.floor(this.time / 60)
      const minutes = this.time % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
  },
}
</script>
