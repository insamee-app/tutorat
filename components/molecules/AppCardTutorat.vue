<template>
  <InsameeCard class="border shadow-lg rounded-xl hover:shadow-xl">
    <template #header>
      <InsameeCardHeader>
        <div class="grid grid-rows-2">
          <InsameeCardTitle
            v-if="tutoratProfile.type == 'Offre'"
            class="text-xl text-bold"
          >
            <span class="text-primary-dark">Offre</span> |
            {{ tutoratProfile.subject }}</InsameeCardTitle
          >
          <InsameeCardTitle v-else-if="tutoratProfile.type == 'Demande'">
            <span class="text-secondary-dark">Demande</span> |
            {{ tutoratProfile.subject }}
          </InsameeCardTitle>
          <div class="font-light">{{ tutoratProfile.school }}</div>
        </div>
      </InsameeCardHeader>
    </template>

    <InsameeCardContent justify>
      <div class="flex flex-row mb-6">
        <InsameeAppProfileAvatar
          :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
          small
          :label="tutoratProfile.currentRole"
        />
        <div class="grid grid-rows-2 gap-0 font-bold">
          <span>{{ tutoratProfile.creator.firstName }}</span>
          <span>{{ tutoratProfile.creator.lastName }}</span>
        </div>
      </div>
      <span v-if="tutoratProfile.type == 'Offre'"
        ><span class="font-bold">{{
          minToHours(tutoratProfile.duration)
        }}</span>
        -
      </span>
      {{ tutoratProfile.description }}</InsameeCardContent
    >
    <template #actions>
      <div class="flex justify-end">
        <InsameeAppButton
          :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
          :to="`/tutorat/${tutoratProfile.id}`"
          >Voir plus</InsameeAppButton
        >
      </div>
    </template>
  </InsameeCard>
</template>

<script>
export default {
  name: 'AppCardTutorat',
  props: {
    tutoratProfile: {
      require: true,
      type: Object,
      default: () => {
        return {
          type: 'Offre',
          school: 'INSA Centre Val de Loire',
          duration: 60,
          description: 'This is the text from the card',
          creator: {
            firstName: 'Prénom',
            lastName: 'Nom',
            email: 'mail@xx.fr',
          },
          currentRole: 'etudiant',
          id: -1,
          subject: 'Mathématiques "4.1',
        }
      },
    },
  },
  methods: {
    minToHours(minAmount) {
      const hours = Math.floor(minAmount / 60)
      const minutes = minAmount % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
  },
}
</script>

<style></style>
