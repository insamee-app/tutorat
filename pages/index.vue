<template>
  <div>
    <InsameeHeroBanner>
      <template #title>
        <InsameeHeroBannerTitle>
          Besoin d'aide pour une de tes matières ?
        </InsameeHeroBannerTitle>
      </template>
      <template #subtitle>
        <InsameeHeroBannerSubtitle>
          Sur <span class="text-primary-base">Tutorat</span>, tu pourras trouver
          des étudiants ou des professeurs qui t’offrent leur aide.
        </InsameeHeroBannerSubtitle>
      </template>
      <template #graphic>
        <GraphicHeroBanner :class="heroBannerClass"></GraphicHeroBanner>
      </template>
    </InsameeHeroBanner>
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <div>
        <InsameeFullContainerTitle>
          Tu as du temps libre pour proposer tes services ?
        </InsameeFullContainerTitle>
        <InsameeFullContainerText class="mt-12">
          Sur <span class="text-primary-base">Tutorat</span>, tu peux proposer
          tes services pour aider des intérressés !
        </InsameeFullContainerText>
      </div>
      <GraphicTutorat :class="graphicStyle" />
    </InsameeFullContainer>
    <InsameeAppHr class="my-8" />
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <InsameeFullContainerTitle>
        Tu veux faire le cours depuis chez toi ?
      </InsameeFullContainerTitle>
      <GraphicCours :class="graphicStyle" />
      <InsameeFullContainerText>
        Avec <span class="text-primary-base">Tutorat</span>, tu peux choisir où
        et comment organiser la séance, aussi bien en distanciel qu’en
        présentiel !
      </InsameeFullContainerText>
    </InsameeFullContainer>
    <InsameeAppHr class="my-8" />
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <InsameeFullContainerTitle class="w-4/5 text-left">
        Perfectionne tes connaissances en les partageant !
      </InsameeFullContainerTitle>
      <GraphicProjet :class="graphicStyle" />
      <InsameeFullContainerText class="text-right self-end">
        <span class="text-primary-base">Tutorat</span> te permet d’apprendre en
        faisant apprendre aux autres, alors tout le monde est gagnant !
      </InsameeFullContainerText>
    </InsameeFullContainer>
  </div>
</template>

<script>
export default {
  computed: {
    heroBannerClass() {
      return 'flex-1 self-end mt-8 sm:w-[60%] md:m-0 md:h-[28rem]'
    },
  },
}
</script>
