<!-- src/components/home/HeroSlide.vue -->
<template>
  <div 
    class="hero-slide" 
    :style="{ backgroundImage: slideLoaded ? `url(${slide.bgImage})` : 'none' }"
    :class="[`alignment-${slide.alignment}`, { 'loaded': slideLoaded }]"
  >
    <!-- Preload background image -->
    <img 
      :src="slide.bgImage" 
      @load="handleBgLoad"
      @error="handleBgLoad"
      style="display: none;"
      alt=""
    />
    
    <!-- Background Overlay -->
    <div 
      class="hero-overlay" 
      :style="{ backgroundColor: slide.overlayColor }"
    ></div>
    
    <div class="container hero-container">
      <!-- Text Content Column -->
      <div class="hero-content">

        <!-- Main Title -->
        <h1 class="hero-title">
          <span v-for="(line, index) in slide.titleLines" 
        :key="index" 
        class="title-line">
            {{ line }}
          </span>
        </h1>

        <!-- Subtitle (small text above title) -->
        <p class="hero-subtitle">
          {{ slide.subtitle }}
        </p>

        <!-- CTA Button -->
        <a 
          :href="slide.ctaLink" 
          class="btn-hero"
          :style="{
            '--btn-gold': '#DFAC29',
            '--btn-gold-light': '#FFE607'
          }"
        >
          {{ slide.ctaText }}
          <span class="btn-arrow">→</span>
        </a>
        

        <!-- Description -->
        <p class="hero-description">
          {{ slide.description }}
        </p>
        
      </div>
      
      <!-- Book Cover Column -->
      <div class="hero-book-cover">
        <img 
          :src="slide.bookCover" 
          :alt="slide.title"
          class="book-cover-image"
          @load="handleCoverLoad"
          @error="handleCoverLoad"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['image-loaded']);

const bgLoaded = ref(false);
const coverLoaded = ref(false);
const slideLoaded = ref(false);

const handleBgLoad = () => {
  bgLoaded.value = true;
  checkAllLoaded();
};

const handleCoverLoad = () => {
  coverLoaded.value = true;
  checkAllLoaded();
};

const checkAllLoaded = () => {
  if (bgLoaded.value && coverLoaded.value && !slideLoaded.value) {
    slideLoaded.value = true;
    emit('image-loaded', props.slide.id);
  }
};
</script>

<style scoped>
.hero-slide {
  position: relative;
  height: calc(100vh - 30px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: pre-line;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.hero-slide.loaded {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 3rem 2rem 0 5rem;
  width: 100%;
}

/* Text Content Column */
.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

/* Center all text elements within .hero-content */
.hero-subtitle,
.hero-title,
.hero-description {
  text-align: center;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.4rem;
  opacity: 0.9;
  color: #fff;
  white-space: pre-line;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 62px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: -.6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.title-line {
  /* Independent gradient for each line */
  background: linear-gradient(to bottom, #FFE607 0%, #F0B429 50%, #bd7500 100%); 
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

.hero-description {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  opacity: 0.95;
  margin-top: 1.6rem;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
}

/* Center the CTA button */
.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--gold-dark);
  background: var(--black);
  padding: .4rem 1.2rem;
  border-radius: 4px;
  border: 1px solid var(--gold-dark);
  transition: all 0.3s ease;
  margin: 0 auto;
  position: relative;
}

.btn-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-hero:hover::before {
  opacity: 1;
}

.btn-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(223, 172, 41, 0.3);
}

.btn-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.btn-hero:hover .btn-arrow {
  transform: translateX(5px);
}

/* Book Cover Column */
.hero-book-cover {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.book-cover-image {
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  transition: 
    transform 0.5s ease,
    filter 0.5s ease;
  position: relative;
  z-index: 2;
  background: transparent;
}

.hero-book-cover:hover .book-cover-image {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8));
}

/* SIMPLIFIED ALIGNMENT - USING FLEX DIRECTION */
.alignment-left .hero-container {
  display: flex;
  flex-direction: row; /* Text left, Image right */
}

.alignment-right .hero-container {
  display: flex;
  flex-direction: row-reverse; /* Image left, Text right */
}

/* Make sure both children take equal space */
.alignment-left .hero-content,
.alignment-right .hero-content,
.alignment-left .hero-book-cover,
.alignment-right .hero-book-cover {
  flex: 1;
}

/* Responsive - Stack vertically on smaller screens */
@media (max-width: 1024px) {
  .alignment-left .hero-container,
  .alignment-right .hero-container {
    flex-direction: column;
    gap: 3rem;
  }
  
  .hero-content {
    order: 2; 
  }
  
  .hero-book-cover {
    order: 1;
  }
  
  .book-cover-image {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .btn-hero {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
  
  .book-cover-image {
    max-width: 250px;
  }
  
  .hero-container {
    padding: 2rem 1rem 0 1rem;
  }
}
</style>