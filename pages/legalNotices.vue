<template>
  <NuxtContent
    :document="content"
    class="mx-4 prose-sm prose text-justify sm:prose lg:prose-lg xl:prose-xl"
  />
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content('legal-notices').fetch()

    return {
      content,
    }
  },
}
</script>
