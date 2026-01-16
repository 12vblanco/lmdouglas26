<!-- src/components/home/HeroCarousel.vue -->
<template>
  <section class="hero-carousel">
    <!-- Carousel Container -->
    <div class="carousel-container">
      <!-- Slides -->
      <div 
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <HeroSlide 
          v-for="slide in slides" 
          :key="slide.id" 
          :slide="slide" 
          class="carousel-slide"
        />
      </div>
      
      <!-- Indicators/Dots -->
      <div class="carousel-indicators">
        <button 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          class="carousel-indicator"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        >
          <div class="indicator-progress" v-if="currentIndex === index"></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { heroSlides } from './heroData.js';
import HeroSlide from './HeroSlide.vue';

const slides = heroSlides;
const currentIndex = ref(0);
let autoplayInterval;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 6000); // Changed to 8 seconds
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.hero-carousel {
  position: relative;
  overflow: hidden;
  padding-bottom: 3rem;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1); /* Slower transition */
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
}

/* Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: all 0.3s ease;
}

.carousel-indicator:hover {
  border-color: var(--gold-dark);
  background: rgba(97, 28, 45, 0.3);
}

.carousel-indicator.active {
  border-color: var(--gold-dark);
  background: var(--gold-dark);
}

.indicator-progress {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--red);
  animation: progress 8s linear infinite; /* Match 8s autoplay */
}

@keyframes progress {
  0% {
    clip-path: polygon(50% 50%, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  100% {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-indicators {
    bottom: 1.5rem;
  }
}
</style>