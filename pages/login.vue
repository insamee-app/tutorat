<template>
  <div
    class="
      items-center
      h-screen
      text-4xl
      font-bold
      text-center text-primary-base
    "
  >
    Redirecting to insamee ...
  </div>
</template>

<script>
export default {
  beforeEnter({ $config }) {
    console.log('zebipa')
    window.location.href = `${$config.baseInsameeUrl}/login`
  },
}
</script>

<style></style>
