<template>
  <div class="flex flex-col">
    <div class="text-xl font-bold truncate">
      <span
        class="uppercase"
        :class="isDemand(type) ? 'text-secondary-base' : 'text-primary-base'"
      >
        {{ type }}
      </span>
      |
      <span class="capitalize"> {{ subjectName }} </span>
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
  },
  methods: {
    isDemand(type) {
      return type === 'demande'
    },
  },
}
</script>
