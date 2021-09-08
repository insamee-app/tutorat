<template>
  <InsameeContact :mail="mail">
    <GraphicMail class="w-full" />
  </InsameeContact>
</template>

<script>
export default {
  computed: {
    mail() {
      return 'mailto:' + this.$config.mailContact
    },
  },
}
</script>
