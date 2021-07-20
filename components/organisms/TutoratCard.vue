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
      <InsameeAppCardHeader>
        <TutoratCardHeader
          :type="type"
          :school-name="schoolName"
          :subject-name="subjectName"
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
        <template v-if="isOffer(type)">
          <span class="font-bold">{{ minToHours(time) }}</span>
          -
        </template>
        {{ text }}
      </div>
    </InsameeAppCardContent>
    <template #actions>
      <div class="flex justify-end">
        <InsameeAppButton
          shadow
          :variant="isDemand(type) ? 'secondary' : 'primary'"
        >
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
  },
  methods: {
    isOffer(type) {
      return type === 'offre'
    },
    isDemand(type) {
      return type === 'demande'
    },
    minToHours(time) {
      const hours = Math.floor(time / 60)
      const minutes = time % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
  },
}
</script>
