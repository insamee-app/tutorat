<template>
  <InsameeAppCard
    :to="{
      name: 'tutorats-id',
      params: {
        id,
      },
    }"
  >
    <template #header>
      <InsameeAppCardHeader>
        <AppTutoratHeader
          :type="type"
          :school-name="schoolName"
          :subject-name="subjectName"
        />
      </InsameeAppCardHeader>
    </template>
    <InsameeAppCardContent justify>
      <AppTutoratAvatar
        :type="type"
        :current-role="currentRole"
        :last-name="lastName"
        :first-name="firstName"
      />
      <template v-if="isOffer(type)">
        <span class="font-bold">{{ time }}</span>
        -
      </template>
      {{ text | cutText }}</InsameeAppCardContent
    >
    <template #actions>
      <div class="flex justify-end">
        <InsameeAppButton :variant="isDemand(type) ? 'secondary' : 'primary'">
          Voir plus
        </InsameeAppButton>
      </div>
    </template>
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'AppTutoratCard',
  filters: {
    cutText(value) {
      if (!value) return
      const length = 120
      const text = value.slice(0, length)
      return text.length === length ? text + '...' : text
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    ownerId: {
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
    avatarUrl: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    text: {
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
  },
}
</script>
