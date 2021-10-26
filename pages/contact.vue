<template>
  <InsameeContact :mail="mail">
    <GraphicMail class="w-full" />
  </InsameeContact>
</template>

<script>
export default {
  head() {
    return {
      title: 'Nous contacter',
    }
  },
  computed: {
    mail() {
      return 'mailto:' + this.$config.mailContact
    },
  },
}
</script>
