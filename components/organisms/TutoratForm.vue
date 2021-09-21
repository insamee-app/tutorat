<script>
import { required, maxLength, requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'TutoratForm',
  props: {
    tutorat: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errors: [],
      loading: false,
      editedTutorat: {
        school: {},
        subject: {},
        type: {},
        siting: {},
        time: {},
        text: '',
      },
      defaultTutorat: {
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
    buttonText() {
      return this.tutorat ? 'Editer le tutorat' : 'Créer le tutorat'
    },
    textMessage() {
      if (!this.$v.editedTutorat.text.$dirty) return ''

      if (!this.$v.editedTutorat.text.maxLength)
        return 'Votre description est trop longue'

      return ''
    },
    isOffer() {
      return this.editedTutorat.type.value === 'offre'
    },
    isEdit() {
      return !!this.tutorat
    },
    variant() {
      return this.isOffer ? 'primary' : 'secondary'
    },
  },
  mounted() {
    if (this.tutorat) {
      this.assignTutorat()
    }
  },
  methods: {
    assignTutorat() {
      this.editedTutorat = Object.assign(this.editedTutorat, this.tutorat)
      if (this.tutorat.type) {
        const typesData = this.$store.getters['data/types']
        this.editedTutorat.type = typesData.find(
          (type) => type.value === this.tutorat.type
        )
      }
      if (this.tutorat.time) {
        const timeData = this.$store.getters['data/time']
        this.editedTutorat.time = timeData.find(
          (time) => time.value === String(this.tutorat.time)
        )
      }
      if (this.tutorat.siting) {
        const sitingData = this.$store.getters['data/siting']
        this.editedTutorat.siting = sitingData.find(
          (siting) => siting.value === this.tutorat.siting
        )
      }
    },
    transformedTutorat() {
      const editedTutorat = {
        school: this.editedTutorat.school.value,
        subject: this.editedTutorat.subject.value,
        text: this.editedTutorat.text,
        type: this.editedTutorat.type.value,
        siting: this.editedTutorat.siting.value,
        time: this.editedTutorat.time.value,
      }

      return editedTutorat
    },
    async send() {
      if (!this.$v.$invalid) {
        const editedTutorat = this.transformedTutorat()
        const url = '/api/v1/tutorats'
        this.loading = true
        try {
          if (this.tutorat) {
            const response = await this.$axios.patch(
              url + '/' + this.tutorat.id + '?platform=tutorat',
              editedTutorat
            )
            this.$emit('success', response.data)
          } else {
            const response = await this.$axios.post(url, editedTutorat)
            this.$emit('success', response.data)
          }
        } catch (error) {
          this.errors = error.response.data.errors
        }
        this.loading = false
      }
    },
    reset() {
      if (this.tutorat) {
        this.assignTutorat()
      } else {
        this.editedTutorat = Object.assign({}, this.defaultTutorat)
      }
    },
    updateSimpleSelect(name) {
      if (this.tutorat) {
        const smallName = name.slice(0, -1)
        const data = this.$store.getters[`data/${name}`]
        this.editedTutorat[smallName] = data.find(
          (el) => el.value === this.tutorat[smallName].id
        )
      }
    },
  },
  validations: {
    editedTutorat: {
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
  <form
    class="space-y-4"
    action="#"
    @submit.prevent="send"
    @reset.prevent="reset"
  >
    <InsameeLabeledItem
      input
      label="Le type"
      :variant="variant"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :disabled="isEdit"
        :value="$v.editedTutorat.type.$model"
        :dismiss-value="editedTutorat.type.value"
        :items="$store.getters['data/types']"
        placeholder="Sélectionner un type"
        :variant="variant"
        @selected="$v.editedTutorat.type.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem label="Le sujet" class-name="text-base" input>
      <SimpleSelect
        :disabled="isEdit"
        :value="$v.editedTutorat.subject.$model"
        :dismiss-value="editedTutorat.subject.text"
        placeholder="Sélectionner un sujet"
        name="subjects"
        :variant="variant"
        @selected="$v.editedTutorat.subject.$model = $event"
        @update="updateSimpleSelect"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      v-if="isOffer"
      input
      label="La durée"
      :variant="variant"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.editedTutorat.time.$model"
        :dismiss-value="editedTutorat.time.value"
        :items="$store.getters['data/time']"
        placeholder="Sélectionner une durée"
        :variant="variant"
        @selected="$v.editedTutorat.time.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      v-if="isOffer"
      input
      label="Le lieu"
      :variant="variant"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.editedTutorat.siting.$model"
        :dismiss-value="editedTutorat.siting.value"
        :items="$store.getters['data/siting']"
        placeholder="Sélectionner un lieu"
        :variant="variant"
        @selected="$v.editedTutorat.siting.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem label="L'école" class-name="text-base" input>
      <SimpleSelect
        :disabled="isEdit"
        :value="$v.editedTutorat.school.$model"
        :dismiss-value="editedTutorat.school.text"
        placeholder="Sélectionner une école"
        name="schools"
        :variant="variant"
        @selected="$v.editedTutorat.school.$model = $event"
        @update="updateSimpleSelect"
      />
    </InsameeLabeledItem>
    <InsameeLabeledTextarea
      v-model="$v.editedTutorat.text.$model"
      name="description"
      placeholder="Description"
      :error-message="textMessage"
      label="La description du tutorat"
      :variant="variant"
    />
    <div class="flex justify-between">
      <InsameeAppButton type="reset" border :variant="variant">
        Réinitialiser
      </InsameeAppButton>
      <InsameeAppButton
        type="submit"
        :loading="loading"
        :disabled="$v.$invalid"
        :variant="variant"
      >
        {{ buttonText }}
      </InsameeAppButton>
    </div>
    <InsameeAppListError :errors="errors" full />
  </form>
</template>
