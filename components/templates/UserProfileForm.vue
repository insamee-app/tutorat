<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle> Modifier mon profil </InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form action="#" class="grid grid-cols-1 gap-4" @submit.prevent="sendUser">
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.lastName.$model"
        :error-message="lastNameMessage"
        type="text"
        name="lastName"
        autocomplete="family-name"
        label="Nom"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.firstName.$model"
        :error-message="firstNameMessage"
        type="text"
        name="firstName"
        autocomplete="given-name"
        label="Prénom"
      />
      <AppSelect
        v-model="$v.fieldsProfile.currentRole.$model"
        name="currentRole"
        :items="currentRoles"
        label="Rôles"
        choose-text
      />
      <InsameeLabeledInput
        v-model.number="$v.fieldsProfile.graduationYear.$model"
        :error-message="graduationYearMessage"
        type="number"
        name="year"
        autocomplete="year"
        label="Année de graduation"
      />
      <div>
        <InsameeAppLabel
          name="preferredSubjects"
          label="Matières préférées"
          input
        />
        <FetchMultiSelect
          v-model="fieldsProfile.preferredSubjects"
          ressource="subjects"
        />
      </div>
      <div>
        <InsameeAppLabel
          name="difficultiesSubjects"
          label="Matières en difficultées"
          input
        />
        <FetchMultiSelect
          v-model="fieldsProfile.difficultiesSubjects"
          ressource="subjects"
        />
      </div>
      <InsameeLabeledTextarea
        v-model="$v.fieldsProfile.text.$model"
        name="description"
        placeholder="Description"
        :error-message="textMessage"
        label="Votre description de tuteur"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.urlFacebook.$model"
        :error-message="facebookMessage"
        type="url"
        name="facebook"
        label="Profil facebook"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.urlInstagram.$model"
        :error-message="facebookMessage"
        type="url"
        name="instagram"
        label="Profil instagram"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.urlTwitter.$model"
        :error-message="facebookMessage"
        type="url"
        name="twitter"
        label="Profil twitter"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.mobile.$model"
        :error-message="mobileMessage"
        type="phone"
        name="mobile"
        autocomplete="phone"
        label="Téléphone"
      />
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
  </InsameeAppCard>
</template>

<script>
import { numeric, between, maxLength, url } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
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
      errors: [],
      loading: false,
      fieldsProfile: {
        lastName: '',
        firstName: '',
        currentRole: '',
        text: '',
        mobile: '',
        preferredSubjects: [],
        difficultiesSubjects: [],
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
      preferredSubjects: {},
      difficultiesSubjects: {},
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
    ...mapState({
      currentRoles: (state) => state.data.currentRoles,
      subjects: (state) => state.data.subjects,
    }),
    transformedProfile() {
      const profile = {}
      Object.assign(profile, this.fieldsProfile)
      profile.tutoratProfile = {
        preferredSubjects: this.fieldsProfile.preferredSubjects.map(
          (sub) => sub.id
        ),
        difficultiesSubjects: this.fieldsProfile.difficultiesSubjects.map(
          (sub) => sub.id
        ),
        text: this.fieldsProfile.text,
      }
      delete profile.preferredSubjects
      delete profile.difficultiesSubjects
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
  mounted() {
    Object.assign(
      this.fieldsProfile,
      this.$store.getters['auth/toUpdateProfile']
    )
  },
  methods: {
    async sendUser() {
      this.loading = true
      try {
        await this.$axios.patch(
          `/api/v1/profiles/${this.userId}`,
          { ...this.transformedProfile },
          {
            withCredentials: true,
          }
        )
        const TutoratProfileResponse = await this.$axios.patch(
          `/api/v1/profiles/${this.userId}?populate=tutorat`,
          { ...this.transformedProfile.tutoratProfile },
          {
            withCredentials: true,
          }
        )
        this.$store.commit('auth/setProfile', {
          ...TutoratProfileResponse.data,
        })
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
