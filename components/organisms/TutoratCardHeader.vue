<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between items-center">
      <div class="text-xl font-bold">
        <span
          class="uppercase"
          :class="isDemand(type) ? 'text-secondary-base' : 'text-primary-base'"
        >
          {{ type }}
        </span>
        |
        <span class="capitalize"> {{ subjectName }} </span>
      </div>
      <div v-if="interestedCount" class="flex-shrink-0 ml-2">
        <InsameeAppChip> {{ interested }}</InsameeAppChip>
      </div>
    </div>
    <div class="font-light">{{ schoolName }}</div>
  </div>
</template>

<script>
export default {
  name: 'TutoratCardHeader',
  props: {
    schoolName: {
      type: String,
      default: '',
    },
    subjectName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    interestedCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    interested() {
      return `${this.interestedCount} ${
        this.interestedCount > 1 ? 'intéressés' : 'intéressé'
      }`
    },
  },
  methods: {
    isDemand(type) {
      return type === 'demande'
    },
  },
}
</script>
