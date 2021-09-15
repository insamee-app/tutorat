<template>
  <div>
    <div v-if="error">Une erreur est survenue</div>
    <InsameeIconSpinner
      v-else-if="!items.length"
      class="animate-spin fill-current mx-auto"
      :class="classSpinner"
    />
    <InsameeSelect
      v-else
      :variant="variant"
      :items="items"
      :placeholder="placeholder"
      :value="value"
      :dismiss-value="dismissValue"
      @selected="$emit('selected', $event)"
    >
      <template #selectItem="props">
        <slot name="selectItem" :item="props.item"></slot>
      </template>
    </InsameeSelect>
  </div>
</template>

<script>
export default {
  name: 'SimpleSelect',
  props: {
    value: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    placeholder: {
      type: String,
      default: '',
    },
    dismissValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: undefined,
    }
  },
  computed: {
    items() {
      return this.$store.getters[`data/${this.name}`]
    },
    classSpinner() {
      const classNames = []
      if (this.isPrimary) classNames.push('text-primary-base')
      else if (this.isSecondary) classNames.push('text-secondary-base')
      return classNames.join(' ')
    },
  },
  async created() {
    try {
      await this.$store.dispatch('data/fetch', this.name)
      this.$emit('update', this.name)
    } catch (error) {
      this.error = error
    }
  },
}
</script>
