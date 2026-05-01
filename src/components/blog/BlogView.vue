<template>
  <div class="blog-page">
    <main class="blog-main">
      <BlogSection />
    </main>
    
  </div>
</template>

<script setup>
import BlogSection from './BlogSection.vue';

</script>

<style scoped>
.blog-page {
  min-height: calc(100vh - 90px);
  margin-top: 90px;
  padding-bottom: 0;
}
.blog-main {
  height: 100%;
}
</style>