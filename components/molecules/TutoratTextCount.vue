<script>
export default {
  name: 'TutoratTextCount',
  props: {
    interestedCount: {
      type: Number,
      default: 0,
    },
    type: {
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
    interestedText() {
      if (!this.interestedCount) return ''

      if (this.interestedCount === 1) return 'comme 1 autre personne,'
      else return `comme ${this.interestedCount} autres personnes,`
    },
  },
}
</script>

<template>
  <div class="text-justify">
    <template v-if="isOffer">
      Ou
      <strong class="font-bold">{{ interestedText }}</strong> marquez votre
      intérêt pour ce tutorat afin de vous faire contacter par le tuteur !
    </template>
    <template v-else-if="isDemand">
      Ou
      <strong class="font-bold">{{ interestedText }}</strong> marquez votre
      intérêt pour cette demande. Lorsqu'un tuteur proposera une offre, vous
      serez averti par mail !
    </template>
  </div>
</template>
