<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle>Modifier mon profil</InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form
      action="#"
      class="grid grid-cols-1 gap-4"
      @submit.prevent="createTutorat"
    >
      <AppSelect
        v-model="$v.fieldsProfile.type.$model"
        name="type"
        :items="tutoratTypes"
        label="Type de tutorat"
        choose-text
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
      <InsameeLabeledTextarea
        v-model="$v.fieldsProfile.text.$model"
        name="description"
        placeholder="Description"
        :error-message="textMessage"
        label="Votre description de tuteur"
      />
      <AppSelect
        v-if="fieldsProfile.type === 'offre'"
        v-model="$v.fieldsProfile.time.$model"
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
          :disabled="$v.$invalid"
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
      fieldsProfile: {
        type: '',
        school: '',
        subject: '',
        text: '',
        time: '',
      },
    }
  },
  validations: {
    fieldsProfile: {
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
      if (!this.$v.fieldsProfile.text.$dirty) return ''

      if (!this.$v.fieldsProfile.text.maxLength)
        return 'Votre présentation est trop longue'

      return ''
    },
    timeMessage() {
      if (!this.$v.fieldsProfile.time.$dirty) return ''

      if (!this.$v.fieldsProfile.time.maxLength)
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
        console.log('Submitted : ', this.fieldsProfile)
        await this.$axios.post(`/api/v1/tutorats`, this.fieldsProfile, {
          withCredentials: true,
        })
        this.loading = false
        this.$emit('close')
      } catch (error) {
        this.loading = false
        this.errors = error.response.data.errors
      }
    },
    handleSelect(name, value) {
      console.log('recv : ', name, value)
      this.fieldsProfile[name] = value
    },
  },
}
</script>
