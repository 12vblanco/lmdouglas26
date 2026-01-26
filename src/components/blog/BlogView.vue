<!-- src/views/BlogView.vue -->
<template>
  <div class="blog-page">
    <Navbar />
    <main class="blog-main">
      <BlogSection />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import BlogSection from '@/components/blog/BlogSection.vue';
import Footer from '@/components/layout/Footer.vue';
import Navbar from '@/components/navigation/Navbar.vue';
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.blog-main {
  flex: 1;
  margin-top: 90px; /* Navbar height */
}
</style>