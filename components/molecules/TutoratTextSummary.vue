<template>
  <div class="text-justify">
    <template v-if="isCreator && isOffer">
      Vous proposez une séance de tutorat de
      <strong>{{ subjectName }}</strong> d'une durée de
      <strong>{{ formatedTime }}</strong
      >.
    </template>
    <template v-else-if="isCreator && isDemand">
      Vous avez besoin d'une séance de tutorat de
      <strong>{{ subjectName }}</strong>
    </template>
    <template v-else-if="isOffer">
      <strong class="font-bold">
        {{ fullName }}
      </strong>
      vous propose une séance de tutorat de
      <strong class="font-bold">{{ subjectName }}</strong> d'une durée de
      <strong class="font-bold">{{ formatedTime }}</strong
      >. Vous pouvez demander plus d'informations en prenant contact via
      <InsameeAppButton
        empty
        :variant="isDemand ? 'secondary' : 'primary'"
        :to="{
          name: 'mee-id',
          params: {
            id: userId,
          },
        }"
      >
        sa page profil.
      </InsameeAppButton>
    </template>
    <template v-else-if="isDemand">
      <strong class="font-bold">
        {{ fullName }}
      </strong>
      a besoin d'une séance de tutorat de
      <strong class="font-bold"> {{ subjectName }}</strong
      >. Pour l’aider, vous pouvez proposer créer une nouvelle séance de
      tutorat.
    </template>
  </div>
</template>

<script>
export default {
  name: 'TutoratTextSummary',
  props: {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    subjectName: {
      type: String,
      default: '',
    },
    time: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Number,
      required: true,
    },
    isCreator: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formatedTime() {
      const hours = Math.floor(this.time / 60)
      const minutes = this.time % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
    isOffer() {
      return this.type === 'offre'
    },
    isDemand() {
      return this.type === 'demande'
    },
    fullName() {
      if (!this.firstName) {
        return 'Une gentille personne'
      }

      return `${this.firstName} ${this.lastName}`
    },
  },
}
</script>
