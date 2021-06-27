<template>
  <section class="space-y-2">
    <AppSelect
      v-model="tutoratType"
      name="type"
      :items="tutoratTypes"
      label="Type de tutorat"
      choose-text
    />
    <AppSelect
      v-model="currentRole"
      name="currentRole"
      :items="currentRoles"
      label="Rôles"
      choose-text
    />
    <FetchSelect
      name="subject"
      ressource="subjects"
      label="Matière"
      @selected="handleSelect"
    />
    <FetchSelect
      name="school"
      ressource="schools"
      label="Ecole"
      @selected="handleSelect"
    />
    <!-- <InsameeLabeledTextarea
            v-model="$v.fieldsProfile.duration.$model"
            name="Durée"
            placeholder="Durée"
            :error-message="timeMessage"
            label="Durée du tutorat"
          /> -->
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FiltersTutorats',
  computed: {
    ...mapState({
      currentRoles: (state) => state.data.currentRoles,
      tutoratTypes: (state) => state.data.tutoratTypes,
    }),
    currentRole: {
      get() {
        const value = this.$store.state.filters.tutorats.currentRole
        return value === undefined ? '' : value
      },
      set(value) {
        const newValue = value === '' ? undefined : value
        this.handleSelect('currentRole', newValue)
      },
    },
    tutoratType: {
      get() {
        const value = this.$store.state.filters.tutorats.type
        return value === undefined ? '' : value
      },
      set(value) {
        const newValue = value === '' ? undefined : value
        this.handleSelect('type', newValue)
      },
    },
  },
  methods: {
    handleSelect(name, value) {
      this.$store.commit('filters/setFilter', { name, value })
    },
    associationOption(item) {
      let option = item.name
      if (item.school) option += ' - ' + item.school.name
      return option
    },
  },
}
</script>

<style></style>
