<template>
  <InsameeAppCard border>
    <InsameeAppCardHeader :closable="closable" @close="$emit('close', $event)">
      <InsameeAppCardTitle> Editer le tutorat </InsameeAppCardTitle>
    </InsameeAppCardHeader>
    <TutoratForm :tutorat="tutorat" @success="$emit('success', $event)" />
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'TutoratFormCard',
  props: {
    tutorat: {
      type: Object,
      default: () => {},
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
