<template>
  <form @submit.prevent="submit" @reset.prevent="reset">
    <InsameeLabeledItem
      label="Type du tutorat"
      variant="secondary"
      class-name="text-base"
    >
      <div class="flex justify-between">
        <InsameeAppButton
          variant="secondary"
          :border="filters.type !== 'demande'"
          @click.prevent="setType('demande')"
        >
          Demande
        </InsameeAppButton>
        <InsameeAppButton
          :border="filters.type !== 'offre'"
          @click.prevent="setType('offre')"
        >
          Offre
        </InsameeAppButton>
      </div>
    </InsameeLabeledItem>
    <InsameeLabeledItem
      class="mt-2"
      label="Durée"
      variant="secondary"
      class-name="text-base"
    >
      <InsameeSelect
        :value="filters.time"
        :dismiss-value="filters.time.value"
        variant="secondary"
        placeholder="Durée du tutorat"
        :items="itemsTime"
        @selected="filters.time = $event"
      />
    </InsameeLabeledItem>
    <!-- Il faut faire les 2 boutons pour celui là -->
    <!-- <InsameeLabeledItem
      class="mt-2"
      label="Type"
      variant="secondary"
      class-name="text-base"
    >
      <InsameeSelect
        :value="type"
        dismiss-value
        placeholder="Type du tutorat"
        :items="itemsType"
        @selected="type = $event"
      />
    </InsameeLabeledItem> -->
    <InsameeLabeledItem
      class="mt-2"
      label="Rôle du tuteur"
      variant="secondary"
      class-name="text-base"
    >
      <InsameeSelect
        :value="filters.currentRole"
        :dismiss-value="filters.currentRole.value"
        placeholder="Rôle du tuteur"
        variant="secondary"
        :items="itemsCurrentRole"
        @selected="filters.currentRole = $event"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Les matières"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <FiltersComboboxMultiple
        name="subjects"
        variant="secondary"
        placeholder="Sélectionner une / des matières"
        :value="filters['subjects[]']"
        @selected="filters['subjects[]'] = $event"
        @update="updateComboboxMultiple"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Les écoles"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <FiltersComboboxMultiple
        name="schools"
        variant="secondary"
        placeholder="Sélectionner une / des écoles"
        :value="filters['schools[]']"
        @selected="filters['schools[]'] = $event"
        @update="updateComboboxMultiple"
      />
    </InsameeLabeledItem>
    <div class="flex justify-between mt-4">
      <InsameeAppButton variant="secondary" border type="reset" shadow>
        Réinitialiser
      </InsameeAppButton>
      <InsameeAppButton variant="secondary" type="submit" shadow>
        Valider
      </InsameeAppButton>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Filters',
  data() {
    return {
      filters: {
        currentRole: {},
        type: undefined,
        time: {},
        'schools[]': [],
        'subjects[]': [],
      },
      itemsCurrentRole: [
        { value: 'personnel', text: 'Personnel' },
        { value: 'étudiant', text: 'Étudiant' },
      ],
      itemsTime: [
        {
          text: 30,
          value: 30,
        },
        {
          text: 60,
          value: 60,
        },
        {
          text: 90,
          value: 90,
        },
        {
          text: 120,
          value: 120,
        },
      ],
    }
  },
  watch: {
    '$route.query'() {
      this.updateFilters()
    },
  },
  mounted() {
    const time = this.$store.getters['filters/time']
    if (time)
      this.filters.time =
        this.itemsTime.find((item) => String(item.value) === String(time)) ?? {}

    const currentRole = this.$store.getters['filters/currentRole']
    if (currentRole)
      this.filters.currentRole =
        this.itemsCurrentRole.find(
          (item) => String(item.value) === String(currentRole)
        ) ?? {}

    this.filters.type = this.$store.getters['filters/type']
  },
  methods: {
    setType(type) {
      if (
        (type === 'demande' && this.filters.type === 'demande') ||
        (type === 'offre' && this.filters.type === 'offre')
      )
        this.filters.type = undefined
      else this.filters.type = type
    },
    reset() {
      this.filters = {
        currentRole: {},
        type: undefined,
        time: {},
        'schools[]': [],
        'subjects[]': [],
      }
      this.submit()
    },
    submit() {
      this.$emit('submit', {
        currentRole: this.filters.currentRole.value,
        type: this.filters.type,
        time: this.filters.time.value,
        'schools[]': this.filters['schools[]'].map((el) => el.value),
        'subjects[]': this.filters['subjects[]'].map((el) => el.value),
      })
    },
    updateFilters() {
      this.updateComboboxMultiple('subjects')
      this.updateComboboxMultiple('schools')
    },
    updateComboboxMultiple(name) {
      const filter = this.$store.getters[`filters/${name}`]
      const data = this.$store.getters[`data/${name}`]
      this.filters[name + '[]'] = data.filter((el) => filter.includes(el.value))
    },
  },
}
</script>
