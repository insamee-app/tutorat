<template>
  <div class="flex flex-col">
    <InsameeAppLabel v-if="label" :name="name" :label="label" />
    <select
      :id="name"
      :name="name"
      class="
        pr-2
        border
        rounded-md
        border-primary-dark
        bg-grey-light
        form-select
      "
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="item in selectItems"
        :key="item.id"
        :value="item.id"
        :selected="isSelected(item.id, value)"
        class="hover:bg-primary-dark"
      >
        <slot name="option" :item="item"> {{ item.name }}</slot>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    value: {
      default: '',
      required: true,
      type: String || Array || Object || Number,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    chooseText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectItems() {
      const items = this.items.slice()
      if (this.chooseText) {
        const item = { id: '', name: 'Veuillez choisir une valeur' }
        items.unshift(item)
      }
      return items
    },
  },
  methods: {
    isSelected(id, value) {
      return String(id) === String(value)
    },
  },
}
</script>
