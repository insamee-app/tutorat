<template>
  <div class="flex flex-col justify-between gap-3 m-4">
    <div class="flex flex-row justify-between">
      <AppSelect :options="[5, 10, 15, 20]" />
      <InsameeAppButton variant="secondary">Filtres</InsameeAppButton>
    </div>
    <div class="space-y-4">
      <AppCardTutorat
        v-for="(obj, index) in sampleTutorats"
        :key="index"
        :tutorat-profile="obj"
      />
    </div>
    <InsameePagination :last-page="3" :first-page="1" :current-page="1" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleTutorats: [
        {
          type: 'Offre',
          school: 'INSA Rennes',
          description: 'This is a description test !',
          duration: 260,
          creator: {
            firstName: 'Foo',
            lastName: 'Bar',
            email: 'foo@fake.fr',
          },
          currentRole: 'etudiant',
          id: 127,
          subject: 'Mathématiques 4.1',
        },
        {
          type: 'Demande',
          school: 'INSA de Lyon',
          description: 'This is a description test too !',
          duration: 120,
          creator: {
            firstName: 'Jordan',
            lastName: 'Soubiran-Richard',
            email: 'jbiran@risou.insa-cvl.fr',
          },
          currentRole: 'etudiant',
          id: 128,
          subject: 'Anglais',
        },
      ],
    }
  },
}
</script>

<style></style>
