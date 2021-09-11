<template>
  <section>
    <div
      class="flex flex-row justify-between"
      :class="{ 'text-primary-base': isOffer, 'text-secondary-base': isDemand }"
    >
      <span class="text-lg"> Profils Intéréssés </span>
      <client-only>
        <TutoratProfilesContact
          v-if="profiles.length"
          :is-offer="isOffer"
          :title="title"
        />
      </client-only>
    </div>
    <template v-if="pagination.total">
      <template v-if="profiles.length">
        <div class="grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 mt-4">
          <InsameeProfileCard
            v-for="profile in profiles"
            :key="profile.id"
            type="small"
            :last-name="profile.last_name"
            :first-name="profile.first_name"
            :current-role="profile.current_role"
            :user-id="profile.user_id"
            :text="profile.insamee_profile.short_text"
            :skills="getTexts(profile.insamee_profile.skills)"
            :associations="profile.insamee_profile.associations"
            :link="profile.link"
          />
        </div>
        <InsameePagination
          class="mt-8 max-w-lg mx-auto"
          :small="!$screen.md"
          :previous-page="
            pagination.previous_page_url
              ? pagination.current_page - 1
              : undefined
          "
          :next-page="
            pagination.next_page_url ? pagination.current_page + 1 : undefined
          "
          :first-page="pagination.first_page"
          :last-page="pagination.last_page"
          :current-page="pagination.current_page"
          @pagination="$emit('pagination', $event)"
        />
      </template>
      <template v-else>
        <div class="mt-4">
          Il semble que vous ne soyez pas sur la bonne page pour trouver des
          profils !
          <div class="flex justify-center mt-4">
            <InsameeAppButton empty @click="$emit('pagination', 1)">
              Revenir à la première page ?
            </InsameeAppButton>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <p class="mt-4 max-w-sm mx-auto text-justify">
        Pour le moment, personne n'a montré son intérêt pour ton tutorat !
        N'hésite pas à en parler autour de toi et à le partager ! Si tu penses
        qu'il y a un problème, tu peux aussi nous contacter.
      </p>
      <div class="mt-4 text-center">
        <InsameeAppButton empty inline :to="{ name: 'contact' }">
          Nous contacter ?
        </InsameeAppButton>
      </div>
    </template>
  </section>
</template>

<script>
import getTexts from '@/mixins/getTexts'
export default {
  name: 'AssociationProfiles',
  mixins: [getTexts],
  props: {
    tutoratType: {
      type: String,
      required: true,
    },
    profiles: {
      type: Array,
      default: undefined,
    },
    pagination: {
      type: Object,
      default: undefined,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    isOffer() {
      return this.tutoratType === 'offre'
    },
    isDemand() {
      return this.tutoratType === 'demande'
    },
  },
}
</script>
