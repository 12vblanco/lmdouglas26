<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- Optional: Global Footer if not inside views – but we put Footer inside HomeView only.
         If you want Footer on every page, uncomment below and remove from HomeView/BlogView -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Navbar from './components/navigation/Navbar.vue';
// import Footer from '@/components/footer/FooterSection.vue'
</script>

<style>
#app {
  min-height: 100vh;
}
</style>