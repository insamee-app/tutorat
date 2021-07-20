<template>
  <div>
    <InsameeAppContainer class="mx-auto space-y-8" small>
      <TutoratCardHeader
        :type="tutorat.type"
        :school-name="tutorat.school.name"
        :subject-name="tutorat.subject.name"
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
      <section class="max-w-md mx-auto">
        <div v-if="tutorat.text" class="text-justify">{{ tutorat.text }}</div>
        <TutoratText
          v-else
          :first-name="tutorat.profile.first_name"
          :last-name="tutorat.profile.last_name"
          :type="tutorat.type"
          :subject-name="tutorat.subject.name"
          :time="tutorat.time"
          :email="tutorat.profile.user.email"
          :user-id="tutorat.user_id"
        />
      </section>
      <div class="flex justify-evenly">
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

      <div class="flex justify-center relative -top-12 z-0">
        <GraphicOffer v-if="isOffer(tutorat.type)" />
        <GraphicDemand v-else />
      </div>
      <InsameeAppError :error-message="errorMessage" class="text-center" />
    </InsameeAppContainer>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/v1/tutorats/${params.id}`)

    console.log(data)

    return { tutorat: data }
  },
  data() {
    return {
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
  },
  methods: {
    isOffer(type) {
      return type === 'offre'
    },
    isDemand(type) {
      return type === 'demande'
    },
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
