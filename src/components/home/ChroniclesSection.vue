<!-- src/components/home/ChroniclesSection.vue -->
<template>
  <section class="chronicles-section">
    <div class="container" id="books">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">
          <h3 class="title-line">Chronicles Of The Endless War</h3>
        </h2>
      </div>

      <!-- Books Grid -->
      <div class="books-grid">
        <div 
          v-for="book in books" 
          :key="book.id" 
          class="book-card"
          :class="book.status"
        >
          <!-- Book Cover Image -->
          <div class="book-cover-container">
            <img 
              :src="book.flatCover" 
              :alt="book.title"
              class="book-cover-image"
              :class="{ 'grayscale': book.status === 'coming-soon' || book.status === 'pre-order' }"
            />
            
            <!-- Status Badge -->
            <div class="book-status" :class="book.status">
              {{ formatStatus(book.status) }}
            </div>
          </div>

          <!-- Book Info -->
          <div class="book-info">
            <p class="book-title">{{ book.title }}</p>
            
            <!-- CTA Button - Different for Coming Soon -->
            <template v-if="book.status === 'coming-soon'">
              <button class="book-cta disabled" disabled>
                {{ book.ctaText }}
                <ClockIcon size="sm" />
              </button>
            </template>
            <template v-else>
              <a 
                :href="book.ctaLink" 
                class="book-cta"
                :aria-label="`${book.ctaText} - ${book.title}`"
                @click.prevent="handleCtaClick(book.ctaLink, book.status)"
              >
                {{ book.ctaText }}
                <span class="cta-arrow">→</span>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ClockIcon from '../svgs/ClockIcon.vue';
import { chroniclesBooks } from './heroData.js';

const books = chroniclesBooks;

const formatStatus = (status) => {
  const statusMap = {
    'available': 'Available Now',
    'get-it-free': 'Get It Free',
    'coming-soon': 'Coming Soon',
    'pre-order': 'Pre-order Now'
  };
  return statusMap[status] || status;
};

const handleCtaClick = (link, status) => {
  if (status === 'coming-soon') return; // Disabled
  
  if (link.startsWith('#')) {
    // It's an anchor link - scroll to section
    const targetId = link.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Smooth scroll to the element
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, null, link);
    }
  } else {
    // It's a regular link - navigate normally
    window.location.href = link;
  }
};
</script>

<style scoped>
.chronicles-section {
  padding: 3rem 0;
  background: var(--white);
  color: var(--black);
  position: relative;
  overflow: hidden;
  border-top: var(--grey) 1px solid;
  border-bottom: var(--grey) 1px solid;  
  max-width: 94%;
  margin: 0 auto;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: .1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Books Grid */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* Book Card */
.book-card {
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  overflow: visible;
}

.book-card:hover {
  transform: translateY(-8px);
}

/* Book Cover */
.book-cover-container {
  position: relative;
  padding: 0 1rem;
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  max-width: 244px;
  margin: 0 auto;
  overflow: visible;
}

.book-cover-image {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  transform-origin: center center; 
}

.book-card:hover .book-cover-image {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.book-cover-image.grayscale {
  filter: grayscale(0.9);
  opacity: 0.9;
}

/* Status Badge */
.book-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 80px;
  text-align: center;
}

.book-status.available {
  background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-light) 100%);
  color: var(--black);
}

.book-status.get-it-free {
  background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-light) 100%);
  color: var(--black);
}

.book-status.coming-soon {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
}

.book-status.pre-order {
  background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-light) 100%);
  color: var(--black);
}

/* Book Info */
.book-info {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  background: var(--white);
  text-align: center;
}

.book-title {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.3;
  font-weight: 600;
  text-align: center;  
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
}

/* Center the CTA button */
.book-cta {
  display: inline-flex;
  width: 178px;
  height: 54px;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--gold-dark);
  background: var(--black);
  padding: .6rem 0.4rem;
  border-radius: 8px;
  border: 1px solid var(--gold-dark);
  transition: all 0.3s ease;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  text-decoration: none;
}

.book-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-light) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  border-radius: 8px;
}

.book-cta:hover::before {
  opacity: 0.15;
}

.book-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0px 10px 20px rgba(223, 172, 41, 0.3);
}

/* For Coming Soon button (disabled state) */
.book-cta.disabled {
  cursor: not-allowed;
  opacity: 0.7;
  background: var(--black);
  color: var(--gold-dark);
  border-color: var(--gold-dark);
}

.book-cta.disabled:hover {
  transform: none;
  box-shadow: none;
}

.book-cta.disabled:hover::before {
  opacity: 0;
}

.cta-arrow {
  font-size: 1.125rem;
  transition: transform 0.3s ease;
}

.book-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .book-cover-container {
    min-height: 280px;
  }
  
  .book-cover-image {
    max-width: 180px;
  }
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: 1fr;
    max-width: 300px;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .book-title {
    font-size: 1.125rem;
    min-height: 2.8rem;
  }
  
  .book-cta {
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
    min-height: 50px;
    width: 150px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .book-cover-container {
    padding: 1rem 0.5rem 0;
    min-height: 260px;
  }
  
  .book-info {
    padding: 1rem;
  }
  
  .book-cover-image {
    max-width: 160px;
  }
}
</style>