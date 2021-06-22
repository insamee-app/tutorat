<template>
  <div class="flex flex-col h-screen">
    <div class="mt-8 mb-16">
      <div class="mb-8 space-y-2 text-lg text-center">
        <p>Besoin <span class="font-bold">d'aides</span> ?</p>
        <p>Une <span class="font-bold">suggestion</span> ?</p>
        <p>Un <span class="font-bold">bogue</span> trouvé ?</p>
        <p>Un <span class="font-bold">mot</span> gentil ?</p>
      </div>
      <div class="flex flex-row justify-center">
        <InsameeAppButton variant="secondary" large
          >Nous contacter</InsameeAppButton
        >
      </div>
    </div>
    <div><GraphicContact class="w-full" /></div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
