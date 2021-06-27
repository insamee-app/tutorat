<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle>
          <span>
            Éditer une
            <span
              class="uppercase"
              :class="isOffer ? 'text-primary-base' : 'text-secondary-base'"
              >{{ type }}
            </span>
          </span>
        </InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form
      action="#"
      class="grid grid-cols-1 gap-4"
      @submit.prevent="editTutorat"
    >
      <InsameeLabeledTextarea
        v-model="$v.fieldsTutorat.text.$model"
        name="description"
        placeholder="Description"
        :error-message="textMessage"
        label="Description du tutorat"
      />
      <AppSelect
        v-if="isOffer"
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
  validations: {
    fieldsTutorat: {
      text: {
        maxLength: maxLength(2048),
      },
      time: {
        between: between(30, 180),
      },
    },
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    tutoratText: {
      type: String,
      default: '',
    },
    tutoratTime: {
      type: Number,
      required: true,
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
      fieldsTutorat: {
        text: '',
        time: '',
      },
    }
  },
  computed: {
    isOffer() {
      return this.type === 'offre'
    },
    timeOptions() {
      const timeRange = []
      for (let i = 0; i < 180 / 30; i++) {
        timeRange[i] = { id: String(30 * (i + 1)), name: 30 * (i + 1) }
      }
      return timeRange
    },
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
  },
  mounted() {
    this.fieldsTutorat.text = this.tutoratText ?? ''
    this.fieldsTutorat.time = String(this.tutoratTime)
  },
  methods: {
    async editTutorat() {
      this.loading = true
      try {
        const response = await this.$axios.patch(
          `/api/v1/tutorats/${this.tutoratId}`,
          {
            text: this.fieldsTutorat.text,
            time: Number(this.fieldsTutorat.time),
          }
        )
        this.$emit('refresh', response.data)
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
