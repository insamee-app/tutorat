<template>
  <select
    v-model="selected"
    class="
      pr-2
      border
      rounded-md
      border-primary-dark
      text-primary-base
      form-select
    "
  >
    <option v-for="opt in options" :key="opt" class="text-primary-base">
      {{ opt }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    options: {
      require: true,
      type: Array,
      default: () => [5, 10, 15],
    },
  },
  data() {
    return {
      selected: 5,
    }
  },
}
</script>

<style></style>
