<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle>Créer un tutorat</InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form
      action="#"
      class="grid grid-cols-1 gap-4"
      @submit.prevent="createTutorat"
    >
      <AppSelect
        v-model="$v.fieldsTutorat.type.$model"
        name="type"
        :items="tutoratTypes"
        label="Type de tutorat"
        choose-text
      />
      <FetchSelect
        v-model="fieldsTutorat.subject"
        name="subject"
        ressource="subjects"
        label="Matière du tutorat"
      />
      <FetchSelect
        v-model="fieldsTutorat.school"
        ressource="schools"
        name="school"
        label="École"
      />
      <InsameeLabeledTextarea
        v-model="$v.fieldsTutorat.text.$model"
        name="description"
        placeholder="Description"
        :error-message="textMessage"
        label="Votre description de tuteur"
      />
      <AppSelect
        v-if="fieldsTutorat.type === 'offre'"
        v-model="$v.fieldsTutorat.time.$model"
        name="time"
        :items="timeOptions"
        label="Durée du tutorat (minutes)"
        :error-message="timeMessage"
        choose-text
      />
      <div class="flex flex-row justify-between">
        <InsameeAppButton type="reset" border @click="$emit('close')">
          Annuler
        </InsameeAppButton>
        <InsameeAppButton
          type="submit"
          :loading="loading"
          :disabled="$v.$invalid || loading"
        >
          Enregistrer
        </InsameeAppButton>
      </div>
      <InsameeAppListError :errors="errors" full />
    </form>
  </InsameeAppCard>
</template>

<script>
import { between, maxLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'AppNewTutoratForm',
  data() {
    return {
      errors: [],
      loading: false,
      fieldsTutorat: {
        type: '',
        school: '',
        subject: '',
        text: '',
        time: '',
      },
    }
  },
  validations: {
    fieldsTutorat: {
      text: {
        maxLength: maxLength(2048),
      },
      time: {
        between: between(30, 180),
      },
      school: {},
      subject: {},
      type: {},
    },
  },
  computed: {
    ...mapState({
      subjects: (state) => state.data.subjects,
      tutoratTypes: (state) => state.data.tutoratTypes,
    }),
    textMessage() {
      if (!this.$v.fieldsTutorat.text.$dirty) return ''

      if (!this.$v.fieldsTutorat.text.maxLength)
        return 'Votre présentation est trop longue'

      return ''
    },
    timeMessage() {
      if (!this.$v.fieldsTutorat.time.$dirty) return ''

      if (!this.$v.fieldsTutorat.time.maxLength)
        return 'La durée doit être comprise entre 30 minutes et 180 minutes'

      return ''
    },
    timeOptions() {
      const timeRange = []
      for (let i = 0; i < 180 / 30; i++) {
        timeRange[i] = { id: String(30 * (i + 1)), name: 30 * (i + 1) }
      }
      return timeRange
    },
  },
  methods: {
    async createTutorat() {
      this.loading = true
      try {
        await this.$axios.post(`/api/v1/tutorats`, this.fieldsTutorat)
        this.$emit('close')
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
    handleSelect(name, value) {
      this.fieldsTutorat[name] = value
    },
  },
}
</script>
