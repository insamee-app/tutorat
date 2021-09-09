<script>
export default {
  name: 'TutoratInformation',
  props: {
    tutorat: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatedTime() {
      if (this.tutorat.time) {
        const hours = Math.floor(this.tutorat.time / 60)
        const minutes = this.tutorat.time % 60
        return `${hours}h${minutes !== 0 ? minutes : ''}`
      } else {
        return undefined
      }
    },
  },
}
</script>

<template>
  <section>
    <TutoratCardHeader
      :type="tutorat.type"
      :school-name="tutorat.school.name"
      :subject-name="tutorat.subject.name"
      :interested-count="tutorat.users_interested_count"
    />
    <TutoratCardProfile
      class="justify-center"
      :type="tutorat.type"
      :current-role="tutorat.profile.current_role"
      :last-name="tutorat.profile.last_name"
      :first-name="tutorat.profile.first_name"
    />
    <div class="font-bold text-center mt-4">
      {{ formatedTime }}
    </div>
    <div class="max-w-md mx-auto space-y-8 relative mix z-10">
      <div v-if="tutorat.text" class="text-justify">{{ tutorat.text }}</div>
      <TutoratTextSummary
        :first-name="tutorat.profile.first_name"
        :last-name="tutorat.profile.last_name"
        :type="tutorat.type"
        :subject-name="tutorat.subject.name"
        :time="tutorat.time"
        :email="tutorat.profile.user.email"
        :user-id="tutorat.user_id"
      />
      <TutoratTextCount
        :interested-count="tutorat.users_interested_count"
        :type="tutorat.type"
      />
    </div>
  </section>
</template>
