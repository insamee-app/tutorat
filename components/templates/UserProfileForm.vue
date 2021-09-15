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
      <InsameeLabeledItem
        label="Le rôle"
        variant="secondary"
        class="mt-2"
        class-name="text-base"
      >
        <InsameeSelect
          :value="$v.fieldsProfile.currentRole.$model"
          :dismiss-value="dismissSelect"
          :items="$store.getters['data/currentRoles']"
          placeholder="Sélectionner un rôle"
          variant="primary"
          @selected="$v.fieldsProfile.currentRole.$model = $event"
        />
      </InsameeLabeledItem>
      <InsameeLabeledInput
        v-model.number="$v.fieldsProfile.graduationYear.$model"
        :error-message="graduationYearMessage"
        type="number"
        name="year"
        autocomplete="year"
        label="Année de graduation"
      />
      <InsameeLabeledItem label="Matières préférées" class-name="text-base">
        <ComboboxMultiple
          variant="primary"
          placeholder="Selectionner une / des matières"
          name="subjects"
          :value="$v.fieldsProfile.preferredSubjects.$model"
          @selected="$v.fieldsProfile.preferredSubjects.$model = $event"
          @update="updateCombobox('preferredSubjects')"
        />
      </InsameeLabeledItem>
      <InsameeLabeledItem
        label="Matières en difficultées"
        class-name="text-base"
      >
        <ComboboxMultiple
          variant="primary"
          placeholder="Selectionner une / des matières"
          name="subjects"
          :value="$v.fieldsProfile.difficultiesSubjects.$model"
          @selected="$v.fieldsProfile.difficultiesSubjects.$model = $event"
          @update="updateCombobox('difficultiesSubjects')"
        />
      </InsameeLabeledItem>
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
import {
  numeric,
  between,
  maxLength,
  url,
  helpers,
} from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

const date = new Date()

// Used to check if a value is in the item
const mustContain = (value) => {
  const regex = new RegExp(value, 'i')
  return helpers.regex('mustContain', regex)
}

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
        currentRole: {},
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
      urlFacebook: {
        url,
        mustContain: mustContain('facebook'),
      },
      urlInstagram: {
        url,
        mustContain: mustContain('instagram'),
      },
      urlTwitter: {
        url,
        mustContain: mustContain('twitter'),
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

      profile.preferredSubjects = this.fieldsProfile.preferredSubjects.map(
        (subject) => subject.value
      )
      profile.difficultiesSubjects =
        this.fieldsProfile.difficultiesSubjects.map((subject) => subject.value)

      profile.currentRole = profile.currentRole.value

      return profile
    },
    dismissSelect() {
      return this.fieldsProfile.currentRole.value ?? ''
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

      if (!this.$v.fieldsProfile.urlFacebook.mustContain)
        return 'Vous devez saisir une url provenant de Facebook'

      return ''
    },
    instagramMessage() {
      if (!this.$v.fieldsProfile.urlInstagram.$dirty) return ''

      if (!this.$v.fieldsProfile.urlInstagram.url)
        return "Vous devez saisir l'url de votre profil"

      if (!this.$v.fieldsProfile.urlInstagram.mustContain)
        return "Vous devez saisir une url provenant d'Instagram"

      return ''
    },
    twitterMessage() {
      if (!this.$v.fieldsProfile.urlTwitter.$dirty) return ''

      if (!this.$v.fieldsProfile.urlTwitter.url)
        return "Vous devez saisir l'url de votre profil"

      if (!this.$v.fieldsProfile.urlTwitter.mustContain)
        return 'Vous devez saisir une url provenant de Twitter'

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

    const profileData = this.$store.getters['auth/currentRole']
    const data = this.$store.getters['data/currentRoles']
    this.fieldsProfile.currentRole =
      data.find((el) => el.value === profileData) ?? {}
  },
  methods: {
    updateCombobox(name) {
      const profileData = this.$store.getters[`auth/${name}`]
      const data = this.$store.getters[`data/subjects`]
      this.$v.fieldsProfile[name].$model = data.filter((el) =>
        profileData.includes(el.value)
      )
    },
    async sendUser() {
      this.loading = true
      try {
        const response = await this.$axios.patch(
          `/api/v1/profiles/${this.userId}?populate=tutorat`,
          { ...this.transformedProfile }
        )
        this.$store.commit('auth/setProfile', response.data)
        this.$emit('close')
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
