<template>
  <InsameeAppContainer>
    <div class="flex flex-col justify-between">
      <div
        v-if="tutoratInfo.type == 'offre'"
        class="text-xl font-bold truncate"
      >
        <span
          :class="
            tutoratInfo.type === 'offre'
              ? 'text-primary-dark'
              : 'text-secondary-dark'
          "
          >{{ capitalizeFirstLetter(tutoratInfo.type) }}</span
        >
        |
        {{ capitalizeFirstLetter(tutoratInfo.subject.name) }}
      </div>
      <div class="font-light">{{ tutoratInfo.school.name }}</div>
    </div>
    <div class="flex flex-row justify-center my-6">
      <InsameeAppProfileAvatar
        :variant="tutoratInfo.type == 'Demande' ? 'secondary' : 'primary'"
        size="small"
        :label="tutoratInfo.profile.current_role"
      />
      <div class="grid items-center grid-rows-2 gap-0 ml-6 font-bold">
        <span>{{ tutoratInfo.profile.first_name }}</span>
        <span>{{ tutoratInfo.profile.last_name }}</span>
      </div>
    </div>

    <div class="pb-4 text-justify">
      <span class="font-bold"
        >{{ tutoratInfo.profile.first_name }}
        {{ tutoratInfo.profile.last_name }} </span
      >vous propose une séance de tutorat de
      <span class="font-bold">{{ tutoratInfo.subject.name }}</span> d’une durée
      de <span class="font-bold">{{ minToHours(tutoratInfo.time) }}</span
      >. Vous pouvez le contacter via
      <a
        :href="`mailto:toDefine@gmail.com`"
        :class="
          tutoratInfo.type == 'Demande'
            ? 'text-secondary-base'
            : 'text-primary-base'
        "
        >mailto:toDefine@gmail.com</a
      >
      ou en prenant contact sur
      <InsameeAppButton
        empty
        :variant="tutoratInfo.type == 'Demande' ? 'secondary' : 'primary'"
        :to="{
          name: 'mee-id',
          params: {
            id: tutoratInfo.user_id,
          },
        }"
        >sa page profil</InsameeAppButton
      >
      .
    </div>

    <div class="flex justify-center">
      <InsameeAppButton
        class="z-50"
        :variant="tutoratInfo.type == 'Demande' ? 'secondary' : 'primary'"
        :to="{
          name: 'mee-id',
          params: {
            id: tutoratInfo.user_id,
          },
        }"
        >Le contacter</InsameeAppButton
      >
    </div>

    <div class="flex justify-center">
      <GraphicOffre
        v-if="tutoratInfo.type == 'offre'"
        class="absolute bottom-0 w-full mx-auto"
      />
      <GraphicDemande v-else class="absolute bottom-0 w-full mx-auto" />
    </div>
  </InsameeAppContainer>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const tutoratInfoResponse = await $axios.get(
      `/api/v1/tutorats/${params.id}`,
      { withCredentials: true }
    )

    return { tutoratInfo: tutoratInfoResponse.data }
  },
  methods: {
    minToHours(minAmount) {
      const hours = Math.floor(minAmount / 60)
      const minutes = minAmount % 60
      return `${hours}h${minutes !== 0 ? minutes : ''}`
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>

<style></style>
