<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import requiredIf from 'vuelidate/lib/validators/requiredIf'

export default {
  name: 'TutoratForm',
  data() {
    return {
      errors: [],
      loading: false,
      tutorat: {
        school: {},
        subject: {},
        type: {},
        siting: {},
        time: {},
        text: '',
      },
    }
  },
  computed: {
    textMessage() {
      if (!this.$v.tutorat.text.$dirty) return ''

      if (!this.$v.tutorat.text.maxLength)
        return 'Votre description est trop longue'

      return ''
    },
    isOffer() {
      return this.tutorat.type.value === 'offre'
    },
    variant() {
      return this.isOffer ? 'primary' : 'secondary'
    },
  },
  methods: {
    transformedTutorat() {
      const tutorat = {
        school: this.tutorat.school.value,
        subject: this.tutorat.subject.value,
        text: this.tutorat.text,
        type: this.tutorat.type.value,
        siting: this.tutorat.siting.value,
        time: this.tutorat.time.value,
      }

      return tutorat
    },
    async send() {
      if (!this.$v.$invalid) {
        const tutorat = this.transformedTutorat()

        this.loading = true
        try {
          const response = await this.$axios.post('/api/v1/tutorats', tutorat)
          this.$emit('success', response.data)
        } catch (error) {
          this.errors = error.response.data.errors
        }
        this.loading = false
      }
    },
  },
  validations: {
    tutorat: {
      school: {
        required,
      },
      subject: {
        required,
      },
      type: {
        required,
      },
      siting: {
        required: requiredIf('isOffer'),
      },
      time: {
        required: requiredIf('isOffer'),
      },
      text: {
        maxLength: maxLength(2048),
      },
    },
  },
}
</script>

<template>
  <form class="space-y-4" action="#" @submit.prevent="send">
    <InsameeLabeledItem
      label="Le type"
      :variant="variant"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.tutorat.type.$model"
        :dismiss-value="tutorat.type.id"
        :items="$store.getters['data/types']"
        placeholder="Sélectionner un type"
        :variant="variant"
        @selected="$v.tutorat.type.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem label="Le sujet" class-name="text-base">
      <SimpleSelect
        :value="$v.tutorat.subject.$model"
        :dismiss-value="tutorat.subject.text"
        placeholder="Sélectionner un sujet"
        name="subjects"
        :variant="variant"
        @selected="$v.tutorat.subject.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      v-if="isOffer"
      label="La durée"
      :variant="variant"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.tutorat.time.$model"
        :dismiss-value="tutorat.time.id"
        :items="$store.getters['data/time']"
        placeholder="Sélectionner une durée"
        :variant="variant"
        @selected="$v.tutorat.time.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      v-if="isOffer"
      label="Le lieu"
      :variant="variant"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.tutorat.siting.$model"
        :dismiss-value="tutorat.siting.id"
        :items="$store.getters['data/siting']"
        placeholder="Sélectionner un lieu"
        :variant="variant"
        @selected="$v.tutorat.siting.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem label="L'école" class-name="text-base">
      <SimpleSelect
        :value="$v.tutorat.school.$model"
        :dismiss-value="tutorat.school.text"
        placeholder="Sélectionner une école"
        name="schools"
        :variant="variant"
        @selected="$v.tutorat.school.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledTextarea
      v-model="$v.tutorat.text.$model"
      name="description"
      placeholder="Description"
      :error-message="textMessage"
      label="La description du tutorat"
      :variant="variant"
    />
    <div class="flex justify-end">
      <InsameeAppButton
        type="submit"
        :loading="loading"
        :disabled="$v.$invalid"
        :variant="variant"
      >
        Créer le tutorat
      </InsameeAppButton>
    </div>
    <InsameeAppListError :errors="errors" full />
  </form>
</template>
