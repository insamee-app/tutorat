<script>
export default {
  name: 'TutoratActions',
  props: {
    firstName: {
      type: String,
      required: true,
    },
    isOffer: {
      type: Boolean,
      required: true,
    },
    isCreator: {
      type: Boolean,
      required: true,
    },
    socials: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogContact: false,
    }
  },
}
</script>

<template>
  <section class="relative space-y-8">
    <slot name="graphic"></slot>
    <div
      v-if="!isCreator"
      class="flex flex-col md:flex-row justify-evenly items-center relative"
    >
      <InsameeAppButton
        border
        large
        shadow
        :variant="isOffer ? 'primary' : 'secondary'"
        @click="dialogContact = true"
      >
        Contacter {{ firstName }}
      </InsameeAppButton>
      <Interested v-slot="{ on, interested, loading }">
        <InsameeAppButton
          :variant="isOffer ? 'primary' : 'secondary'"
          class="mt-4 md:mt-0"
          large
          shadow
          :border="interested"
          :disabled="loading"
          :loading="loading"
          v-on="on"
        >
          {{
            interested ? 'Je ne suis plus intéréssé(e)' : 'Je suis intéressé(e)'
          }}
        </InsameeAppButton>
      </Interested>
    </div>
    <Report v-if="!isCreator" v-slot="{ on }" type="tutorats">
      <InsameeAppButton empty variant="grey-secondary" v-on="on">
        Signaler le tutorat
      </InsameeAppButton>
    </Report>
    <InsameeAppModal :value="dialogContact" @outside="dialogContact = false">
      <InsameeAppCard>
        <InsameeAppCardHeader closable @close="dialogContact = false">
          <InsameeAppCardTitle> Contacter {{ firstName }} </InsameeAppCardTitle>
        </InsameeAppCardHeader>
        <InsameeAppContact :links="socials" />
      </InsameeAppCard>
    </InsameeAppModal>
  </section>
</template>
