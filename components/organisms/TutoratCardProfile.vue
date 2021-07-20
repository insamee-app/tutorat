<template>
  <div class="flex">
    <InsameeAppProfileAvatar
      :variant="isDemand(type) ? 'secondary' : 'primary'"
      size="small"
      :label="currentRole"
    />
    <div class="flex flex-col ml-6 font-bold">
      <span>{{ firstName }}</span>
      <span>{{ lastName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCardTutoratAvatar',
  props: {
    type: {
      type: String,
      default: '',
    },
    currentRole: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
  },
  methods: {
    isDemand() {
      return this.type === 'demande'
    },
  },
}
</script>
