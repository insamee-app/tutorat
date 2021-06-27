<template>
  <InsameeAppCard
    :to="{
      name: 'tutorats-id',
      params: {
        id,
      },
    }"
  >
    <template #header>
      <InsameeAppCardHeader>
        <div class="flex flex-col justify-between">
          <div class="text-xl font-bold truncate">
            <span
              class="uppercase"
              :class="
                isDemand(type) ? 'text-secondary-base' : 'text-primary-base'
              "
            >
              {{ type }}
            </span>
            |
            <span class="capitalize"> {{ subjectName }} </span>
          </div>
          <div class="font-light">{{ schoolName }}</div>
        </div>
      </InsameeAppCardHeader>
    </template>
    <InsameeAppCardContent justify>
      <div class="flex flex-row mb-6">
        <InsameeAppProfileAvatar
          :link="avatarUrl"
          size="small"
          :variant="isDemand(type) ? 'secondary' : 'primary'"
          :label="currentRole"
        />
        <div class="flex flex-col ml-6 font-bold">
          <span>{{ firstName }}</span>
          <span>{{ lastName }}</span>
        </div>
      </div>
      <template v-if="isOffer(type)">
        <span class="font-bold">{{ time }}</span>
        -
      </template>
      {{ text | cutText }}</InsameeAppCardContent
    >
    <template #actions>
      <div
        class="flex"
        :class="ownerId === userId ? 'justify-between' : 'justify-end'"
      >
        <InsameeAppButton
          v-if="ownerId === userId"
          :variant="isDemand(type) ? 'secondary' : 'primary'"
          @click="$emit('edit', id)"
        >
          Editer
        </InsameeAppButton>
        <InsameeAppButton :variant="isDemand(type) ? 'secondary' : 'primary'">
          Voir plus
        </InsameeAppButton>
      </div>
    </template>
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'AppTutoratCard',
  filters: {
    cutText(value) {
      if (!value) return
      const length = 120
      const text = value.slice(0, length)
      return text.length === length ? text + '...' : text
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: Number,
      required: true,
    },
    subjectName: {
      type: String,
      default: '',
    },
    schoolName: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    currentRole: {
      type: String,
      default: '',
    },
  },
  methods: {
    isOffer(type) {
      return type === 'offre'
    },
    isDemand(type) {
      return type === 'demande'
    },
  },
}
</script>
