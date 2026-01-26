<!-- src/components/home/MapSection.vue -->
<template>
  <section class="map-section" id="map">
    <div class="container">
      <div class="map-container" ref="mapContainer">
        <!-- Map Image -->
        <img 
          src="../../assets/images/map-bw.jpeg" 
          alt="World Map of The Endless War"
          class="map-image"
        />
        
        <!-- Interactive Points -->
        <div class="map-interactive-layer">
          <div 
            v-for="point in mapPoints" 
            :key="point.id"
            class="map-point"
            :class="{ 'active': activePoint === point.id }"
            :style="{
              top: point.position.top,
              left: point.position.left,
              zIndex: activePoint === point.id ? 2000 : 10
            }"
            @mouseenter="activatePoint(point)"
            @mouseleave="deactivatePoint"
            @click="activatePoint(point)"
          >
            <div class="point-circle"></div>
            
            <!-- Tooltip -->
            <div 
              v-if="activePoint === point.id" 
              class="map-tooltip"
              :style="getTooltipStyle(point.position)"
            >
              <!-- Tooltip Content -->
              <div class="tooltip-content" :class="{ 'no-image': !hasImage(point) }">
                <h3 class="tooltip-title">{{ point.title }}</h3>
                <p class="tooltip-description">{{ point.description }}</p>
                
                <!-- Conditional Image - Only render if image exists and is not empty -->
                <div 
                  v-if="hasImage(point)" 
                  class="tooltip-image-container"
                  :class="{ 'filler-image': !point.image }"
                >
                  <template v-if="point.image">
                    <img 
                      :src="point.image" 
                      :alt="point.title"
                      class="tooltip-image"
                    />
                  </template>
                  <template v-else>
                    <div class="filler-image-content">
                      <span class="filler-icon">🏰</span>
                      <p>Location of {{ point.type }}</p>
                    </div>
                  </template>
                </div>
                
                <!-- Type Badge -->
                <span class="tooltip-type">{{ point.type }}</span>
              </div>
              
              <!-- Tooltip Arrow -->
              <!-- <div class="tooltip-arrow" :style="getArrowStyle(point.position)"></div> -->
            </div>
          </div>
        </div>
        
        <!-- Map Title/Description -->
        <div class="map-overlay">
          <h2 class="map-title" >The Gharantia Realm</h2>
          <p class="map-description">
            Explore the realms, kingdoms, and battlefields of Gharantia.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { mapPoints } from './heroData.js';

const activePoint = ref(null);

const activatePoint = (point) => {
  activePoint.value = point.id;
};

const deactivatePoint = () => {
  activePoint.value = null;
};

// Check if point has a valid image
const hasImage = (point) => {
  // Return false if image is undefined, null, or empty string
  return !!(point.image && point.image.trim());
};

// Simple positioning: if point is in bottom half, show tooltip above; if top half, show below
const getTooltipStyle = (position) => {
  const topPercent = parseFloat(position.top);
  const leftPercent = parseFloat(position.left);
  
  // Determine if point is in top or bottom half
  const isInBottomHalf = topPercent > 50;
  
  // Tooltip dimensions (fixed)
  const tooltipWidth = 400;
  const tooltipHeight = 320;
  
  // Default position: centered horizontally relative to point
  let tooltipLeft = -tooltipWidth / 2; // Center the tooltip on the point
  let tooltipTop = isInBottomHalf ? -tooltipHeight - 30 : 80; // Above or below
  
  // Keep tooltip within map bounds horizontally
  // If point is too far left, push tooltip right
  if (leftPercent < 15) {
    tooltipLeft = 0;
  }
  // If point is too far right, push tooltip left
  else if (leftPercent > 85) {
    tooltipLeft = -tooltipWidth;
  }
  
  return {
    top: `${tooltipTop}px`,
    left: `${tooltipLeft}px`,
    '--arrow-position': isInBottomHalf ? 'bottom' : 'top'
  };
};

// Calculate arrow position
const getArrowStyle = (position) => {
  const topPercent = parseFloat(position.top);
  const isInBottomHalf = topPercent > 50;
  
  if (isInBottomHalf) {
    // Tooltip is above point, arrow points down
    return {
      bottom: '-10px',
      left: 'calc(50% - 10px)',
      transform: 'rotate(45deg)',
      borderBottom: '2px solid var(--gold-dark)',
      borderRight: '2px solid var(--gold-dark)',
      borderTop: 'none',
      borderLeft: 'none'
    };
  } else {
    // Tooltip is below point, arrow points up
    return {
      top: '-10px',
      left: 'calc(50% - 10px)',
      transform: 'rotate(45deg)',
      borderTop: '2px solid var(--gold-dark)',
      borderLeft: '2px solid var(--gold-dark)',
      borderBottom: 'none',
      borderRight: 'none'
    };
  }
};
</script>

<style scoped>
.map-section {
  padding: 3rem 0;
  background: var(--white);
  color: var(--black);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Map Container */
.map-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 12px;
}

/* Map Image */
.map-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: all 0.5s ease;
}

/* Interactive Layer */
.map-interactive-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Map Points */
.map-point {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Active point gets higher z-index */
.map-point.active {
  z-index: 2000 !important;
}

.map-point:hover .point-circle {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(223, 172, 41, 0.5);
}

.map-point.active .point-circle {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(223, 172, 41, 0.5);
}

.point-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--black);
  background: var(--gold-dark);
  opacity: 0.7;
  transition: all 0.3s ease;
  position: relative;
}

.point-circle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--gold-light);
  opacity: 0.8;
  animation: pulse-scale 2s infinite ease-in-out;
}

@keyframes pulse-scale {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5); /* 15px → 18px */
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
}

/* Pause animation on hover/active for cleaner look */
.map-point:hover .point-circle::after,
.map-point.active .point-circle::after {
  animation: none;
  width: 15px;
  height: 15px;
  opacity: 0.9;
}

/* Map Tooltip */
.map-tooltip {
  position: absolute;
  width: 380px;
  min-height: auto;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 2px solid var(--gold-dark);
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tooltip-content {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* When there's no image, adjust spacing */
.tooltip-content.no-image {
  padding-bottom: 2rem;
}

.tooltip-content.no-image .tooltip-description {
  margin-bottom: 2rem;
}

.tooltip-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1.2;
  margin-bottom: 0.75rem;
  color: var(--black);
    text-align: left;
}

.tooltip-description {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  flex-grow: 1;
  text-align: left;
}

/* Image Container - Only shown when hasImage returns true */
.tooltip-image-container {
  width: 100%;
  height: fit-content;
  margin-bottom: 1rem;
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-off-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Regular image */
.tooltip-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tooltip-image:hover {
  transform: scale(1.05);
}

/* Filler Image Styles - only when image container exists but image is empty */
.tooltip-image-container.filler-image {
  background: linear-gradient(135deg, var(--color-off-white) 0%, #e0e0e0 100%);
  border: 2px dashed var(--gold-dark);
}

.filler-image-content {
  text-align: center;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.6);
}

.filler-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.filler-image-content p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  margin: 0;
}

.tooltip-type {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--gold-dark);
  color: var(--black);
  border-radius: 20px;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  align-self: flex-start;
  margin-top: auto;
}

/* Tooltip Arrow */
.tooltip-arrow {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--white);
}

/* Map Overlay */
.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: transparent;
  color: var(--black);
  text-align: center;
  pointer-events: none;
  z-index: 1; /* Keep below interactive points */
}

.map-title {
  position: absolute;
  top: 30%;
  right: 27%;
  font-family: var(--font-heading);
  font-size: 2.4rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  color: var(--black);
  pointer-events: none;
}

.map-description {
  position: absolute;
  top: 33.5%;
  right: 25%;
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  pointer-events: none;
}

/* Responsive Design - Hide interactivity on mobile */
@media (max-width: 768px) {
  .map-section {
    padding: 4rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .map-container {
    border-radius: 8px;
  }
  
  /* Hide interactive elements on mobile */
  .map-point {
    display: none;
  }
  
  .map-interactive-layer {
    display: none;
  }
  
  .map-overlay {
    padding: 1.5rem;
    position: relative;
    height: auto;
  }
  
  .map-title {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
  }
  
  .map-description {
    position: relative;
    top: auto;
    right: auto;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .map-section {
    padding: 3rem 0;
  }
  
  .map-overlay {
    padding: 1rem;
  }
  
  .map-title {
    font-size: 1.5rem;
  }
}

/* Optional: Add a subtle border/glow effect */
.map-container::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, 
    var(--gold-dark) 0%, 
    transparent 20%, 
    transparent 80%, 
    var(--gold-dark) 100%
  );
  border-radius: 13px;
  z-index: -1;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.map-container:hover::before {
  opacity: 0.6;
}
</style>