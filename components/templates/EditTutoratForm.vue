<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle>Editer une offre/demande</InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form
      action="#"
      class="grid grid-cols-1 gap-4"
      @submit.prevent="editTutorat"
    >
      <InsameeLabeledTextarea
        v-model="$v.fieldsProfile.text.$model"
        name="description"
        placeholder="Description"
        :error-message="textMessage"
        label="Description du tutorat"
      />
      <AppSelect
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
          Editer le tutorat
        </InsameeAppButton>
      </div>
      <InsameeAppListError :errors="errors" full />
    </form>
  </InsameeAppCard>
</template>

<script>
import { between, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'EditTutoratForm',
  props: {
    tutoratText: {
      type: String,
      required: true,
      default: '',
    },
    tutoratTime: {
      type: Number,
      required: true,
      default: 30,
    },
    tutoratId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      loading: false,
      fieldsProfile: {
        text: this.tutoratText,
        time: this.tutoratTime,
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
    },
  },
  computed: {
    timeOptions() {
      const timeRange = []
      for (let i = 0; i < 180 / 30; i++) {
        timeRange[i] = { id: String(30 * (i + 1)), name: 30 * (i + 1) }
      }
      return timeRange
    },
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
  },
  methods: {
    async editTutorat() {
      this.loading = true
      try {
        await this.$axios.patch(
          `/api/v1/tutorats/${this.tutoratId}`,
          {
            text: this.fieldsProfile.text,
            time: Number(this.fieldsProfile.time),
          },
          {
            withCredentials: true,
          }
        )
        this.loading = false
        this.$emit('refresh')
        this.$emit('close')
      } catch (error) {
        this.loading = false
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
