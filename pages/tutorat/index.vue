<template>
  <InsameeResponsiveList>
    <template #filter> For the filter </template>
    <template #cards>
      <InsameeResponsiveListCards>
        <AppCardTutorat
          v-for="tutortProfile in tutoratPosts.data"
          :key="tutortProfile.id"
          :tutorat-profile="tutortProfile"
          >This is like a card</AppCardTutorat
        >
        <template #pagination>
          <InsameeResponsiveListPagination>
            <InsameePagination
              :small="true"
              :last-page="tutoratPosts.meta.last_page"
              :first-page="tutoratPosts.meta.first_page"
              :current-page="tutoratPosts.meta.current_page"
              :previous-page="tutoratPosts.meta.previous_page_url"
              :next-page="tutoratPosts.meta.next_page"
            />
          </InsameeResponsiveListPagination>
        </template>
      </InsameeResponsiveListCards>
    </template>
    <template #modal> For the modal </template>
  </InsameeResponsiveList>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const tutoratPostsResponse = await $axios.get(
      '/api/v1/tutorats?page=1&limit=1',
      {
        withCredentials: true,
      }
    )
    return { tutoratPosts: tutoratPostsResponse.data }
  },
}
</script>

<style></style>
