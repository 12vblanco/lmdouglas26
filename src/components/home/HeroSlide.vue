<!-- src/components/home/HeroSlide.vue -->
<template>
  <div 
    class="hero-slide" 
    :style="{ backgroundImage: `url(${slide.bgImage})` }"
    :class="`text-${slide.alignment}`"
  >
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
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  slide: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.hero-slide {
  position: relative;
  height: 78vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  overflow: hidden;
     white-space: pre-line;

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
  margin-bottom: 1.4srem;
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

/* Alignment classes for different slide configurations */
.text-left .hero-container {
  /* Default is already left column = text, right column = book */
}

.text-left .hero-content {
  align-items: center;
  text-align: center;
}

.text-left .hero-book-cover {
  display: flex;
  justify-content: center;
}

.text-center .hero-container {
  grid-template-columns: 1fr;
  text-align: center;
}

.text-center .hero-content {
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.text-center .hero-book-cover {
  order: -1;
  display: flex;
  justify-content: center;
}

.text-right .hero-container {
  grid-template-columns: 1fr 1fr;
}

.text-right .hero-content {
  order: 2;
  align-items: center;
  text-align: center;
}

.text-right .hero-book-cover {
  order: 1;
  display: flex;
  justify-content: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .text-right .hero-container,
  .text-left .hero-container {
    grid-template-columns: 1fr;
  }
  
  .text-right .hero-content,
  .text-left .hero-content {
    order: 2;
    align-items: center;
    text-align: center;
  }
  
  .text-right .hero-book-cover,
  .text-left .hero-book-cover {
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
}
</style>