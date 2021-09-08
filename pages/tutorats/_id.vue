<template>
  <InsameeAppContainer class="mx-auto space-y-8 overflow-hidden" small>
    <TutoratCardHeader
      :type="tutorat.type"
      :school-name="tutorat.school.name"
      :subject-name="tutorat.subject.name"
      :interested-count="tutorat.users_interested_count"
    />
    <TutoratCardProfile
      class="justify-center"
      :type="tutorat.type"
      :current-role="tutorat.profile.current_role"
      :last-name="tutorat.profile.last_name"
      :first-name="tutorat.profile.first_name"
    />
    <div class="font-bold text-center">
      {{ formatedTime }}
    </div>
    <section class="max-w-md mx-auto space-y-8">
      <div v-if="tutorat.text" class="text-justify">{{ tutorat.text }}</div>
      <TutoratTextSummary
        :first-name="tutorat.profile.first_name"
        :last-name="tutorat.profile.last_name"
        :type="tutorat.type"
        :subject-name="tutorat.subject.name"
        :time="tutorat.time"
        :email="tutorat.profile.user.email"
        :user-id="tutorat.user_id"
      />
      <TutoratTextCount
        :interested-count="tutorat.users_interested_count"
        :type="tutorat.type"
      />
    </section>
    <div class="relative">
      <div class="flex justify-evenly items-center">
        <InsameeAppButton
          border
          large
          shadow
          :variant="isOffer ? 'primary' : 'secondary'"
          @click="dialogContact = true"
        >
          Contacter {{ firstName }}
        </InsameeAppButton>
        <Interested v-slot="{ on, interested, loading }">
          <InsameeAppButton
            :variant="isOffer ? 'primary' : 'secondary'"
            large
            shadow
            :border="interested"
            :disabled="loading"
            :loading="loading"
            v-on="on"
          >
            {{
              interested
                ? 'Je ne suis plus intéréssé(e)'
                : 'Je suis intéressé(e)'
            }}
          </InsameeAppButton>
        </Interested>
        <!-- TODO: ça doit devenir son propre composant pour avoir un fetch -->
        <!-- <template v-if="profile.user_id === tutorat.user_id">
          <div class="space-x-4 flex flex-row">
            <InsameeAppButton
              variant="negative"
              class="z-10"
              :disabled="deleting"
              :loading="deleting"
              @click="deleteTutorat"
            >
              Supprimer
            </InsameeAppButton>
            <InsameeAppButton
              class="z-10"
              :variant="isDemand(tutorat.type) ? 'secondary' : 'primary'"
              @click="editTutorat = true"
            >
              Editer
            </InsameeAppButton>
          </div>
        </template> -->
        <!-- <InsameeAppButton
          class="z-10"
          :variant="isDemand(tutorat.type) ? 'secondary' : 'primary'"
          :to="{
            name: 'mee-id',
            params: {
              id: tutorat.user_id,
            },
          }"
        >
          Contacter {{ tutorat.profile.first_name }}
        </InsameeAppButton> -->
      </div>
      <Report v-slot="{ on }" type="tutorats" class="mt-4">
        <InsameeAppButton empty variant="grey-secondary" v-on="on">
          Signaler le tutorat
        </InsameeAppButton>
      </Report>
      <div class="absolute transform -translate-x-1/2 left-1/2">
        <GraphicOffer v-if="isOffer" />
        <GraphicDemand v-else />
      </div>
    </div>

    <!-- <InsameeAppError :error-message="errorMessage" class="text-center" /> -->
    <Portal v-if="dialogContact">
      <InsameeAppModal :value="dialogContact" @outside="dialogContact = false">
        <InsameeAppCard>
          <InsameeAppCardHeader closable @close="dialogContact = false">
            <InsameeAppCardTitle>
              Contacter {{ firstName }}
            </InsameeAppCardTitle>
          </InsameeAppCardHeader>
          <InsameeAppContact :links="socials" />
        </InsameeAppCard>
      </InsameeAppModal>
    </Portal>
    <!-- <InsameeAppModal
      v-slot="{ size }"
      v-model="editTutorat"
      v-scroll-lock="editTutorat"
      @outside="editTutorat = false"
    >
      <EditTutoratForm
        :class="size"
        :tutorat-text="tutorat.text"
        :tutorat-time="tutorat.time"
        :tutorat-id="tutorat.id"
        :type="tutorat.type"
        @close="editTutorat = false"
        @refresh="refresh"
      />
    </InsameeAppModal> -->
  </InsameeAppContainer>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import { mapState } from 'vuex'

export default {
  components: {
    Portal,
  },
  middleware: 'authenticated',
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(
      `/api/v1/tutorats/${params.id}?platform=tutorat&serialize=full`
    )

    return { tutorat: data }
  },
  data() {
    return {
      dialogContact: false,
      errorMessage: '',
      editTutorat: false,
      deleting: false,
    }
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    formatedTime() {
      if (this.tutorat.time) {
        const hours = Math.floor(this.tutorat.time / 60)
        const minutes = this.tutorat.time % 60
        return `${hours}h${minutes !== 0 ? minutes : ''}`
      } else {
        return undefined
      }
    },
    firstName() {
      return this.tutorat.profile.first_name ?? ''
    },
    socials() {
      return {
        facebook: this.tutorat.profile.url_facebook,
        instagram: this.tutorat.profile.url_instagram,
        twitter: this.tutorat.profile.url_twitter,
        mobile: this.tutorat.profile.mobile,
      }
    },
    isOffer() {
      return this.tutorat.type === 'offre'
    },
    isDemand() {
      return this.tutorat.type === 'demande'
    },
  },
  methods: {
    refresh(data) {
      this.editTutorat = false
      this.tutorat = data
    },
    async deleteTutorat() {
      this.deleting = true
      try {
        await this.$axios.delete(`/api/v1/tutorats/${this.tutorat.id}`)
        this.$router.push({
          path: '/tutorats',
        })
      } catch (error) {
        const status = error.response.status
        if (status === 404) {
          this.errorMessage = "La ressource n'a pas été trouvée"
        }
      }
      this.deleting = false
    },
  },
}
</script>
