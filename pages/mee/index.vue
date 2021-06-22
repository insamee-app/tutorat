<template>
  <div class="grid gap-3 m-4 grid-row-5">
    <InsameeProfileBasic
      :profile="{}"
      variant="secondary"
    ></InsameeProfileBasic>
    <InsameeLabeledItem label="Matières préférées" class="overflow-x-scroll">
      <InsameeAppChips :texts="samplePreferedSubjects"></InsameeAppChips>
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Matières en difficulté"
      class="overflow-x-scroll"
    >
      <InsameeAppChips :texts="sampleDifficultSubjects"></InsameeAppChips>
    </InsameeLabeledItem>
    <InsameeLabeledItem label="Description">
      <div class="text-base text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus
        erat. Mauris in fringilla orci. Duis maximus dictum urna sed interdum.
        Pellentesque faucibus tellus risus, in tempus nunc rhoncus a. Mauris non
        metus feugiat, mattis mauris et, dictum orci. Vivamus vitae porta metus.
        Nulla ut fringilla justo. Aliquam lobortis gravida ligula, et pretium ex
        euismod id. Nam ut consectetur mauris, id vestibulum elit. Aenean non
        libero sed diam facilisis lacinia. Curabitur nec turpis consectetur est
        condimentum convallis sit amet vitae lacus. Maecenas mattis porta tortor
        eu elementum. Nulla rhoncus turpis felis, imperdiet convallis magna
        viverra pretium. Quisque ac mauris semper, tempus est vel, tincidunt
        risus. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Vestibulum at libero eu sem rhoncus
        gravida ut lacinia leo.
      </div>
    </InsameeLabeledItem>
    <InsameeProfileContact :links="socialContactsSample" />
    <div class="flex justify-end mb-4">
      <InsameeAppButton large @click="toggleEditProfile = true"
        >Editer le profil</InsameeAppButton
      >
    </div>
    <h1 class="text-xl font-bold">Paramètre du compte</h1>
    <div class="text-center">
      <InsameeAppLink link="insamee.fr"
        >Se rendre sur insamee.fr</InsameeAppLink
      >
    </div>
    <InsameeAppModal
      v-model="toggleEditProfile"
      @outside="toggleEditProfile = false"
    >
      <UserProfileForm :user-id="-1" @close="toggleEditProfile = false" />
    </InsameeAppModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleEditProfile: false,
      samplePreferedSubjects: [
        'Mathématiques 4.1',
        'Algorithmie',
        'Mathématiques 4.1',
        'Algorithmie',
        'Mathématiques 4.1',
        'Algorithmie',
      ],
      sampleDifficultSubjects: ['SHS', 'Anglais'],
      socialContactsSample: {
        facebook: undefined,
        instagram: 'https://instagram.com',
        Twitter: undefined,
        Téléphone: '+33781977168',
      },
    }
  },
}
</script>

<style></style>
