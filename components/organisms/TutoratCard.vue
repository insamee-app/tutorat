<template>
  <div>
    <AppTutoratCard
      :id="id"
      :subject-name="subjectName"
      :school-name="schoolName"
      :avatar-url="avatarUrl"
      :type="type"
      :text="text"
      :time="minToHours(time)"
      :first-name="firstName"
      :last-name="lastName"
      :current-role="currentRole"
      :user-id="userId"
      :owner-id="ownerId"
    />
  </div>

  <!-- <InsameeAppModal
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
    </InsameeAppModal> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppCardTutorat',
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
      type: Number,
      default: 0,
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
