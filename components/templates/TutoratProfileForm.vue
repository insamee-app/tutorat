<template>
  <InsameeCard closable @close="$emit('close')">
    <template #header>Créer une demande / offre de tutorat</template>
    <form
      action="#"
      class="grid grid-cols-1 gap-4"
      @submit.prevent="sendTutoratRequest"
    >
      <div>
        <InsameeAppLabel name="type" label="Type de requête" input />
        <AppSelect
          v-model="$v.fieldsProfile.type.$model"
          name="type"
          :options="['Offre', 'Demande']"
          label="Rôles"
          choose-text
        />
      </div>
      <div>
        <InsameeAppLabel name="Subject" label="Matières" input />
        <AppSelect :options="fakeSubjects" />
      </div>
      <InsameeLabeledTextarea
        v-model="$v.fieldsProfile.text.$model"
        name="Description"
        placeholder="Description"
        :error-message="textMessage"
        label="Description du tutorat"
      />
      <div v-if="fieldsProfile.type == 'Demande'">
        <InsameeLabeledTextarea
          v-model="$v.fieldsProfile.school.$model"
          name="School"
          placeholder="Ecole"
          :error-message="textMessage"
          label="Lieu du tutorat"
        />
      </div>
      <div v-if="fieldsProfile.type == 'Offre'">
        <InsameeLabeledTextarea
          v-model="$v.fieldsProfile.duration.$model"
          name="Durée"
          placeholder="Durée"
          :error-message="textMessage"
          label="Durée du tutorat"
        />
      </div>
      <div class="flex flex-row justify-between">
        <InsameeAppButton type="reset" border @click="$emit('close')">
          Annuler
        </InsameeAppButton>
        <InsameeAppButton
          type="submit"
          :loading="loading"
          :disabled="$v.$invalid"
        >
          Enregistrer
        </InsameeAppButton>
      </div>
      <InsameeAppListError :errors="errors" full />
    </form>
  </InsameeCard>
</template>

<script>
// import { mapState } from 'vuex'
import { numeric, between, maxLength, url } from 'vuelidate/lib/validators'

const date = new Date()

export default {
  name: 'UserProfileForm',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentRoles: 'etudiant',
      fakeSubjects: [
        'Mathématiques 4.1',
        'Anglais',
        'EPS',
        'SHS',
        'Sécurité Informatique',
        'Programmation Web',
      ],
      errors: [],
      loading: false,
      fieldsProfile: {
        lastName: '',
        firstName: '',
        currentRole: '',
        text: '',
        mobile: '',
        skills: [],
        focusInterests: [],
        associations: [],
        graduationYear: 0,
        urlFacebook: '',
        urlInstagram: '',
        urlTwitter: '',
      },
    }
  },
  validations: {
    fieldsProfile: {
      lastName: {
        maxLength: maxLength(30),
      },
      firstName: {
        maxLength: maxLength(30),
      },
      currentRole: {},
      text: {
        maxLength: maxLength(2048),
      },
      mobile: {
        numeric,
        maxLength: maxLength(10),
      },
      graduationYear: {
        between: between(1957, date.getFullYear() + 5),
      },
      // TODO: ajouter une regex pour vérifier que c'est bien une lien de là et il faut faire de même pour le serveur
      urlFacebook: {
        url,
      },
      urlInstagram: {
        url,
      },
      urlTwitter: {
        url,
      },
    },
  },
  computed: {
    /* ...mapState({ currentRoles: (state) => state.data.currentRoles }), */
    transformedProfile() {
      const profile = {}
      Object.assign(profile, this.fieldsProfile)

      profile.focusInterests = profile.focusInterests.map((value) => value.id)
      profile.skills = profile.skills.map((value) => value.id)
      profile.associations = profile.associations.map((value) => value.id)

      return profile
    },
    lastNameMessage() {
      if (!this.$v.fieldsProfile.lastName.$dirty) return ''

      if (!this.$v.fieldsProfile.lastName.maxLength)
        return 'Ce nom est trop long'

      return ''
    },
    firstNameMessage() {
      if (!this.$v.fieldsProfile.firstName.$dirty) return ''

      if (!this.$v.fieldsProfile.lastName.maxLength)
        return 'Ce prénom est trop long'

      return ''
    },
    graduationYearMessage() {
      if (!this.$v.fieldsProfile.graduationYear.$dirty) return ''

      if (!this.$v.fieldsProfile.graduationYear.between)
        return "Cette année de diplomation n'est pas valide"

      return ''
    },
    textMessage() {
      if (!this.$v.fieldsProfile.text.$dirty) return ''

      if (!this.$v.fieldsProfile.text.maxLength)
        return 'Votre présentation est trop longue'

      return ''
    },
    facebookMessage() {
      if (!this.$v.fieldsProfile.urlFacebook.$dirty) return ''

      if (!this.$v.fieldsProfile.urlFacebook.url)
        return "Vous devez saisir l'url de votre profil"

      return ''
    },
    instagramMessage() {
      if (!this.$v.fieldsProfile.urlInstagram.$dirty) return ''

      if (!this.$v.fieldsProfile.urlInstagram.url)
        return "Vous devez saisir l'url de votre profil"

      return ''
    },
    twitterMessage() {
      if (!this.$v.fieldsProfile.urlTwitter.$dirty) return ''

      if (!this.$v.fieldsProfile.urlTwitter.url)
        return "Vous devez saisir l'url de votre profil"

      return ''
    },
    mobileMessage() {
      if (!this.$v.fieldsProfile.mobile.$dirty) return ''

      if (!this.$v.fieldsProfile.mobile.numeric)
        return 'Votre numéro doit contenir des chiffres'

      if (!this.$v.fieldsProfile.mobile.maxLength)
        return 'Votre numéro est trop long'

      return ''
    },
  },
  /* mounted() {
    Object.assign(
      this.fieldsProfile,
      this.$store.getters['auth/toUpdateProfile']
    )
  }, */
  methods: {
    formatAssociations({ name, school }) {
      return `${name.toUpperCase()} - ${school.name}`
    },
    async sendTutoratRequest() {
      this.loading = true
      try {
        const response = await this.$axios.patch(
          `/api/v1/profiles/${this.userId}`,
          { ...this.transformedProfile },
          {
            withCredentials: true,
          }
        )
        this.$store.commit('auth/setProfile', response.data)
        this.loading = false
        this.$emit('close')
      } catch (error) {
        this.loading = false
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
