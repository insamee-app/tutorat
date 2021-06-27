<template>
  <div class="pb-4 text-justify">
    <span class="font-bold">
      {{ firstName }}
      {{ lastName }}
    </span>
    {{ isOffer(type) ? 'vous propose ' : "a besoin d'" }}une séance de tutorat
    de
    <span class="font-bold capitalize">{{ subjectName }}</span>
    d’une durée de <span class="font-bold">{{ formatTime }} </span>
    . Vous pouvez le contacter via
    <a
      :href="`mailto:${email}`"
      :class="isDemand(type) ? 'text-secondary-base' : 'text-primary-base'"
    >
      {{ email }}
    </a>
    ou en prenant contact sur
    <InsameeAppButton
      empty
      :variant="isDemand(type) ? 'secondary' : 'primary'"
      :to="{
        name: 'mee-id',
        params: {
          id: userId,
        },
      }"
    >
      sa page profil
    </InsameeAppButton>
    .
  </div>
</template>

<script>
export default {
  name: 'TutoratText',
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
    email: {
      type: String,
      default: '',
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formatTime() {
      const hours = Math.floor(this.time / 60)
      const minutes = this.time % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
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
