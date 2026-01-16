<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <main>
       <HeroCarousel id="home" />
      <ChroniclesSection id="chronicles" />
      <MapSection id="map" />
      <NewsletterSection id="newsletter" /> 
      <FooterSection id="footer"/>
    </main>
  </div>
</template>

<script setup>
import FooterSection from './components/footer/FooterSection.vue';
import ChroniclesSection from './components/home/ChroniclesSection.vue';
import HeroCarousel from './components/home/HeroCarousel.vue';
import MapSection from './components/home/MapSection.vue';
import NewsletterSection from './components/home/NewsletterSection.vue';
import Navbar from './components/navigation/Navbar.vue';
</script>

<style>
#app {
  min-height: 100vh;
}


</style>