<template>
  <main>
    <HeroCarousel id="home" />
    <ChroniclesSection id="chronicles" />
    <MapSection id="map" />
    <NewsletterSection id="newsletter" />
    <FooterSection id="footer" />
  </main>
</template>

<script setup>
import FooterSection from '../components/footer/FooterSection.vue'
import ChroniclesSection from '../components/home/ChroniclesSection.vue'
import HeroCarousel from '../components/home/HeroCarousel.vue'
import MapSection from '../components/home/MapSection.vue'
import NewsletterSection from '../components/home/NewsletterSection.vue'
</script>

<style scoped>
main {
  min-height: calc(100vh - 90px);
}
</style>