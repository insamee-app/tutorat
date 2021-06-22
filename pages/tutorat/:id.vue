<template>
  <div class="static h-screen mx-4 space-y-6">
    <div class="grid grid-rows-2">
      <InsameeCardTitle
        v-if="tutoratProfile.type == 'Offre'"
        class="text-xl text-bold"
      >
        <span class="text-primary-dark">Offre</span> | Sujet de
        l'offre</InsameeCardTitle
      >
      <InsameeCardTitle v-else-if="tutoratProfile.type == 'Demande'">
        <span class="text-secondary-dark">Demande</span> | Sujet de la demande
      </InsameeCardTitle>
      <div class="font-light">{{ tutoratProfile.school }}</div>
    </div>

    <div class="flex flex-row justify-center mb-6">
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

    <div class="pb-4 text-justify">
      <span class="font-bold"
        >{{ tutoratProfile.creator.firstName }}
        {{ tutoratProfile.creator.lastName }} </span
      >vous propose une séance de tutorat de
      <span class="font-bold">{{ tutoratProfile.subject }}</span> d’une durée de
      <span class="font-bold">{{ minToHours(tutoratProfile.duration) }}</span
      >. Vous pouvez le contacter via
      <a
        :href="`mailto:${tutoratProfile.creator.email}`"
        :class="
          tutoratProfile.type == 'Demande'
            ? 'text-secondary-base'
            : 'text-primary-base'
        "
        >{{ tutoratProfile.creator.email }}</a
      >
      ou en prenant contact sur
      <InsameeAppLink
        :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
        :link="`/mee/${tutoratProfile.id}`"
        >sa page profil</InsameeAppLink
      >.
    </div>

    <div class="flex justify-center">
      <InsameeAppButton
        :variant="tutoratProfile.type == 'Demande' ? 'secondary' : 'primary'"
        :to="`/mee/${tutoratProfile.id}`"
        >Le contacter</InsameeAppButton
      >
    </div>

    <div class="flex justify-center">
      <GraphicOffre
        v-if="tutoratProfile.type == 'Offre'"
        class="absolute bottom-0 w-full mx-auto"
      />
      <GraphicDemande
        v-else-if="tutoratProfile.type == 'Demande'"
        class="absolute bottom-0 w-full mx-auto"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tutoratProfile: {
        type: 'Demande',
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
        subject: 'Mathématiques 4.1',
      },
    }
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
