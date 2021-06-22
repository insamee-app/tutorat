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
    <div class="flex justify-end">
      <InsameeAppButton large :to="{ name: 'contact' }"
        >Contacter</InsameeAppButton
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      samplePreferedSubjects: [
        'Mathématiques 4.1',
        'Algorithmie',
        'Mathématiques 4.1',
        'Algorithmie',
        'Mathématiques 4.1',
        'Algorithmie',
      ],
      sampleDifficultSubjects: ['SHS', 'Anglais'],
    }
  },
}
</script>

<style></style>
