<template>
  <InsameeAppContainer>
    <div class="flex flex-col justify-between">
      <div class="text-xl font-bold truncate">
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
        :variant="tutoratInfo.type == 'demande' ? 'secondary' : 'primary'"
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
      >{{ tutoratInfo.type == 'offre' ? 'vous propose ' : "a besoin d'" }}une
      séance de tutorat de
      <span class="font-bold">{{
        capitalizeFirstLetter(tutoratInfo.subject.name)
      }}</span>
      d’une durée de <span class="font-bold">{{ formatedHour }}</span
      >. Vous pouvez le contacter via
      <a
        :href="`mailto:toDefine@gmail.com`"
        :class="
          tutoratInfo.type == 'demande'
            ? 'text-secondary-base'
            : 'text-primary-base'
        "
        >mailto:toDefine@gmail.com</a
      >
      ou en prenant contact sur
      <InsameeAppButton
        empty
        :variant="tutoratInfo.type == 'demande' ? 'secondary' : 'primary'"
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

    <div class="flex justify-evenly">
      <InsameeAppButton
        class="z-2"
        :variant="tutoratInfo.type == 'demande' ? 'secondary' : 'primary'"
        :to="{
          name: 'mee-id',
          params: {
            id: tutoratInfo.user_id,
          },
        }"
        >Le contacter</InsameeAppButton
      >
      <InsameeAppButton
        v-if="profile.user_id === tutoratInfo.user_id"
        :variant="tutoratInfo.type == 'demande' ? 'secondary' : 'primary'"
        @click="toggleEdit = true"
        >Editer</InsameeAppButton
      >
      <InsameeAppButton
        v-if="profile.user_id === tutoratInfo.user_id"
        @click="deleteTutorat"
        >Supprimer</InsameeAppButton
      >
    </div>

    <div class="flex justify-center">
      <GraphicOffre
        v-if="tutoratInfo.type == 'offre'"
        class="absolute bottom-0 w-full mx-auto"
      />
      <GraphicDemande v-else class="absolute bottom-0 w-full mx-auto" />
    </div>
    <InsameeAppModal
      v-model="toggleEdit"
      v-scroll-lock="toggleEdit"
      @outside="toggleEdit = false"
    >
      <EditTutoratForm
        class="z-10"
        :tutorat-text="tutoratInfo.text"
        :tutorat-time="tutoratInfo.time"
        :tutorat-id="tutoratInfo.id"
        @close="toggleEdit = false"
        @refresh="reFetchData"
      />
    </InsameeAppModal>
  </InsameeAppContainer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  async asyncData({ $axios, params }) {
    const tutoratInfoResponse = await $axios.get(
      `/api/v1/tutorats/${params.id}`,
      { withCredentials: true }
    )

    return { tutoratInfo: tutoratInfoResponse.data }
  },
  data() {
    return {
      toggleEdit: false,
    }
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    formatedHour() {
      return this.minToHours(this.tutoratInfo.time)
    },
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
    async reFetchData() {
      const tutoratInfoResponse = await this.$axios.get(
        `/api/v1/tutorats/${this.tutoratInfo.id}`,
        { withCredentials: true }
      )
      this.tutoratInfo = tutoratInfoResponse.data
    },
    async deleteTutorat() {
      await this.$axios.delete(`/api/v1/tutorats/${this.tutoratInfo.id}`, {
        withCredentials: true,
      })
      this.$router.push({
        path: '/mee',
      })
    },
  },
}
</script>

<style></style>
