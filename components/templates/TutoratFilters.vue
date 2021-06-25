<template>
  <div>
    <InsameeAppButton large primary @click="fetchFilters"
      >Filtrer les annonces</InsameeAppButton
    >
    <InsameeAppModal
      v-model="toggleFilter"
      v-scroll-lock="toggleFilter"
      @outside="toggleFilter = false"
    >
      <InsameeAppCard>
        <template #header>
          <InsameeAppCardHeader closable @close="toggleFilter = false">
            Filtrer les tutorats
          </InsameeAppCardHeader></template
        >
        <form
          action="#"
          class="grid grid-cols-1 gap-4"
          @submit.prevent="validDialog"
        >
          <AppSelect
            v-model="$v.fieldsProfile.tutoratTypes.$model"
            name="type"
            :items="tutoratTypes"
            label="Type de tutorat"
            choose-text
            @selected="handleSelect"
          />
          <AppSelect
            v-model="$v.fieldsProfile.currentRole.$model"
            name="currentRole"
            :items="currentRoles"
            label="Rôles"
            choose-text
            @selected="handleSelect"
          />
          <FetchSelect
            v-model="$v.fieldsProfile.subject.$model"
            name="subject"
            ressource="subjects"
            label="Matière"
            @input="handleSelect"
          />
          <FetchSelect
            v-model="$v.fieldsProfile.school.$model"
            ressource="schools"
            name="school"
            label="Ecole"
            @input="handleSelect"
          />
          <!-- <InsameeLabeledTextarea
            v-model="$v.fieldsProfile.duration.$model"
            name="Durée"
            placeholder="Durée"
            :error-message="timeMessage"
            label="Durée du tutorat"
          /> -->
          <div class="flex flex-row justify-between">
            <InsameeAppButton type="reset" border @click="toggleFilter = false">
              Annuler
            </InsameeAppButton>
            <InsameeAppButton type="reset" border @click="resetFilter">
              Reset
            </InsameeAppButton>
            <InsameeAppButton
              type="submit"
              :loading="loading"
              :disabled="$v.$invalid"
            >
              Enregistrer
            </InsameeAppButton>
          </div>
          <InsameeAppListError :errors="errors" full />
        </form>
      </InsameeAppCard>
    </InsameeAppModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { between } from 'vuelidate/lib/validators'

export default {
  name: 'TutoratFilters',
  data() {
    return {
      errors: [],
      loading: false,
      toggleFilter: false,
      fieldsProfile: {
        type: undefined,
        subject: undefined,
        currentRole: undefined,
        school: undefined,
        duration: undefined,
      },
    }
  },
  computed: {
    ...mapState({
      currentRoles: (state) => state.data.currentRoles,
      tutoratTypes: (state) => state.data.tutoratTypes,
      currentFilters: (state) => state.filters.tutoratsQuery,
    }),
    timeMessage() {
      if (!this.$v.fieldsProfile.duration.between)
        return 'La durée doit être comprise en 30 minutes et 180 minutes'

      return ''
    },
  },
  validations: {
    fieldsProfile: {
      currentRole: {},
      tutoratTypes: {},
      subject: {},
      school: {},
      duration: {
        between: between(30, 180),
      },
    },
  },
  methods: {
    resetFilter() {
      this.$store.commit('filters/resetTutoratFilter')
      this.$router.push({
        path: '/tutorat',
      })
      this.toggleFilter = false
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    handleSelect(name, value) {
      this.$store.commit('filters/setTutoratsFilter', { name, value })
    },
    validDialog() {
      const query = this.$store.getters['filters/getUsersSearchParams']
      this.$router.push({
        path: `/tutorat?${query}`,
      })
      this.toggleFilter = false
    },
    fetchFilters() {
      Object.assign(this.fieldsProfile, this.currentFilters)
      this.toggleFilter = true
    },
  },
}
</script>

<style></style>
