<script>
export default {
  name: 'TutoratForm',
  data() {
    return {
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

      if (!this.$v.tutorat.text.maxLength) return ''

      return ''
    },
  },
  methods: {
    transformedTutorat() {
      return this.tutorat
    },
  },
  validations: {
    tutorat: {
      school: {},
      subject: {},
      type: {},
      siting: {},
      time: {},
      text: {},
    },
  },
}
</script>

<template>
  <form class="space-y-4">
    <InsameeLabeledItem
      label="Le type"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.tutorat.type.$model"
        :dismiss-value="tutorat.type.id"
        :items="$store.getters['data/types']"
        placeholder="Sélectionner un type"
        variant="primary"
        @selected="$v.tutorat.type.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Le lieu"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.tutorat.siting.$model"
        :dismiss-value="tutorat.siting.id"
        :items="$store.getters['data/siting']"
        placeholder="Sélectionner un lieu"
        variant="primary"
        @selected="$v.tutorat.siting.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Le temps"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="$v.tutorat.time.$model"
        :dismiss-value="tutorat.time.id"
        :items="$store.getters['data/time']"
        placeholder="Sélectionner un temps"
        variant="primary"
        @selected="$v.tutorat.time.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem label="Le sujet" class-name="text-base">
      <SimpleSelect
        :value="$v.tutorat.subject.$model"
        :dismiss-value="tutorat.subject.text"
        placeholder="Sélectionner un sujet"
        name="subjects"
        variant="primary"
        @selected="$v.tutorat.subject.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem label="L'école" class-name="text-base">
      <SimpleSelect
        :value="$v.tutorat.school.$model"
        :dismiss-value="tutorat.school.text"
        placeholder="Sélectionner une école"
        name="schools"
        variant="primary"
        @selected="$v.tutorat.school.$model = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledTextarea
      v-model="$v.tutorat.text.$model"
      name="description"
      placeholder="Description"
      :error-message="textMessage"
      label="La description du tutorat"
    />
    {{ transformedTutorat() }}
  </form>
</template>
