<template>
  <div class="flex flex-col items-center">
    <InsameeIconSpinner
      v-if="$fetchState.pending"
      class="w-6 h-6 my-4 fill-current animate-spin text-primary-dark"
    ></InsameeIconSpinner>
    <AppSelect
      v-else
      v-model="selected"
      :name="name"
      :items="fetchedData"
      :label="label"
      choose-text
      class="w-full"
      @input="$emit('input', $event)"
    >
      <template #option="{ item }">
        <slot name="option" :item="item"></slot>
      </template>
    </AppSelect>
  </div>
</template>

<script>
import fetchData from '~/mixins/fetchData'

export default {
  name: 'FetchSelect',
  mixins: [fetchData],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    ressource: {
      type: String,
      required: true,
    },
  },
  computed: {
    selected: {
      get(value) {
        return value
      },
      set(value) {
        const newValue = value === '' ? undefined : value
        this.$emit('selected', this.name, newValue)
      },
    },
  },
}
</script>
