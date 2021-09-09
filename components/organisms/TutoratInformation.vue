<script>
export default {
  name: 'TutoratInformation',
  props: {
    tutorat: {
      type: Object,
      required: true,
    },
    isCreator: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isOffer() {
      return this.tutorat.type === 'offre'
    },
    formatedTime() {
      if (!this.isOffer) return

      const hours = Math.floor(this.tutorat.time / 60)
      const minutes = this.tutorat.time % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
  },
}
</script>

<template>
  <section class="space-y-4 md:space-y-6">
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
    <div v-if="isOffer" class="font-bold text-center">
      {{ formatedTime }} -
      <span class="capitalize"> {{ tutorat.siting }} </span>
    </div>
    <div class="max-w-md mx-auto space-y-8 relative mix z-10">
      <div v-if="tutorat.text && !isCreator" class="text-justify">
        {{ tutorat.text }}
      </div>
      <TutoratTextSummary
        :first-name="tutorat.profile.first_name"
        :last-name="tutorat.profile.last_name"
        :type="tutorat.type"
        :subject-name="tutorat.subject.name"
        :time="tutorat.time"
        :email="tutorat.profile.user.email"
        :user-id="tutorat.user_id"
        :is-creator="isCreator"
      />
      <TutoratTextCount
        v-if="!isCreator"
        :interested-count="tutorat.users_interested_count"
        :type="tutorat.type"
      />
    </div>
  </section>
</template>
