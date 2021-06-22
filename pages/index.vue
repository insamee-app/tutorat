<template>
  <div>
    <div class="container relative h-screen">
      <div class="px-2 pb-12 space-y-2">
        <div class="text-4xl font-bold">
          Besoin d'aide dans une de tes matières ?
        </div>
        <div class="text-sm text-grey-base">
          Sur <span class="font-bold text-primary-light">Tutorat</span>, tu
          pourras trouver des étudiants ou des professeurs qui t’offrent leur
          aide.
        </div>
      </div>
      <GraphicHeroBanner class="absolute right-0"></GraphicHeroBanner>
      <div
        class="absolute bottom-0 flex items-center justify-center w-full h-10"
      >
        <IconArrow />
      </div>
    </div>
    <InsameeFullContainer around>
      <InsameeFullContainerTitle class="px-4"
        >Tu as du temps libre pour proposer tes services
        ?</InsameeFullContainerTitle
      >
      <InsameeFullContainerText class="px-4"
        >Sur <span class="font-semibold text-primary-base">Tutorat</span>, tu
        peux proposer tes services pour aider des intérressés
        !</InsameeFullContainerText
      >
      <GraphicTutorat class="w-full" />
    </InsameeFullContainer>

    <InsameeFullContainer around>
      <InsameeFullContainerTitle class="px-4"
        >Tu veux faire le cours depuis chez toi ?</InsameeFullContainerTitle
      >
      <GraphicCours class="w-full px-2" />
      <InsameeFullContainerText class="px-4"
        >Avec <span class="font-semibold text-primary-base">Tutorat</span>, tu
        peux choisir où et comment organiser la séance, aussi bien en distanciel
        qu’en présentiel !</InsameeFullContainerText
      >
    </InsameeFullContainer>

    <InsameeFullContainer around>
      <InsameeFullContainerTitle class="w-4/5 px-4 text-left"
        >Perfectionne tes connaissances en les partageant
        !</InsameeFullContainerTitle
      >
      <GraphicProjet class="w-full px-2" />
      <InsameeFullContainerText class="px-4 text-right">
        <span class="font-semibold text-primary-base">Tutorat</span> te permet
        d’apprendre en faisant apprendre aux autres, alors tout le monde est
        gagnant !
      </InsameeFullContainerText>
    </InsameeFullContainer>
  </div>
</template>

<script>
export default {}
</script>
