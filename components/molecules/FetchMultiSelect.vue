<template>
  <div class="flex flex-col items-center">
    <InsameeIconSpinner
      v-if="$fetchState.pending"
      class="w-6 h-6 my-4 fill-current animate-spin text-primary-dark"
    ></InsameeIconSpinner>
    <AppMultiSelect
      v-else
      track-by="id"
      :custom-label="format"
      :options="fetchedData"
      multiple
      searchable
      :close-on-select="false"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import fetchData from '~/mixins/fetchData'

export default {
  name: 'FetchMultiSelect',
  mixins: [fetchData],
  props: {
    value: {
      type: Array,
      required: true,
    },
    ressource: {
      type: String,
      required: true,
    },
    format: {
      type: Function,
      default: ({ name }) =>
        name !== '' ? name.charAt(0).toUpperCase() + name.slice(1) : name,
    },
  },
}
</script>
