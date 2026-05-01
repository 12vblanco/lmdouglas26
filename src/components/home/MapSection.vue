<!-- src/components/home/MapSection.vue -->
<template>
  <section class="map-section" id="map">
    <div class="container">
      <div class="map-container" ref="mapContainer">
        <img 
          src="../../assets/images/map-bw.jpeg" 
          alt="World Map of The Endless War"
          class="map-image"
        />
        
        <div class="map-interactive-layer">
          <div 
            v-for="point in mapPoints" 
            :key="point.id"
            class="map-point"
            :class="{ 
              'active': activePoint === point.id,
              'has-image': hasImage(point) 
            }"
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
            
            <div 
              v-if="activePoint === point.id" 
              class="map-tooltip"
              :style="getTooltipStyle(point.position)"
            >
              <div class="tooltip-content">
                <h3 class="tooltip-title">{{ point.title }}</h3>
                <p class="tooltip-description">{{ point.description }}</p>
                
                <!-- Image - full width, auto height, no crop -->
                <div v-if="hasImage(point)" class="tooltip-image-container">
                  <img 
                    :src="point.image" 
                    :alt="point.title"
                    class="tooltip-image"
                  />
                </div>
                
                <span class="tooltip-type">{{ point.type }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="map-overlay">
          <h2 class="map-title">The Gharantia Realm</h2>
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

const hasImage = (point) => {
  return !!(point.image && point.image.trim && point.image.trim());
};

const getTooltipStyle = (position) => {
  const topPercent = parseFloat(position.top);
  const isInBottomHalf = topPercent > 50;
  
  const tooltipWidth = 380;
  const tooltipHeight = 320;
  
  let tooltipLeft = -tooltipWidth / 2;
  let tooltipTop = isInBottomHalf ? -tooltipHeight - 30 : 80;
  
  if (topPercent < 15) {
    tooltipLeft = 0;
  } else if (topPercent > 85) {
    tooltipLeft = -tooltipWidth;
  }
  
  return {
    top: `${tooltipTop}px`,
    left: `${tooltipLeft}px`
  };
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

.map-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 12px;
}

.map-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: all 0.5s ease;
}

.map-interactive-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.map-point {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.map-point.active {
  z-index: 2000 !important;
}

/* Default gold dot */
.map-point .point-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--black);
  background: var(--gold-dark);
  opacity: 0.7;
  transition: all 0.3s ease;
  position: relative;
}

/* Two-tone red dot for points with images */
.map-point.has-image .point-circle {
  background: linear-gradient(135deg, #ffb3b3 0%, #ff6666 100%);
  border-color: #8b0000;
}

.map-point.has-image .point-circle::after {
  background: #cc0000;
  box-shadow: 0 0 4px rgba(204, 0, 0, 0.6);
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
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
}

.map-point:hover .point-circle {
  transform: scale(1.2);
}

.map-point:hover .point-circle {
  box-shadow: 0 0 20px rgba(223, 172, 41, 0.5);
}

.map-point.has-image:hover .point-circle {
  box-shadow: 0 0 20px rgba(255, 102, 102, 0.6);
}

.map-point.active .point-circle {
  transform: scale(1.2);
}

.map-point.active .point-circle {
  box-shadow: 0 0 20px rgba(223, 172, 41, 0.5);
}

.map-point.has-image.active .point-circle {
  box-shadow: 0 0 20px rgba(255, 102, 102, 0.6);
}

.map-point:hover .point-circle::after,
.map-point.active .point-circle::after {
  animation: none;
}

/* Tooltip styling */
.map-tooltip {
  position: absolute;
  width: 380px;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 2px solid var(--gold-dark);
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip-content {
  padding: 1.25rem; /* slightly reduced padding to give more room for image */
  display: flex;
  flex-direction: column;
}

.tooltip-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: var(--black);
  text-align: left;
}

.tooltip-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.4;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  text-align: left;
}

/* Image container - full width, auto height, no cropping */
.tooltip-image-container {
  width: calc(100% + 2.5rem); /* extend to full tooltip width (accounting for padding) */
  margin-left: -1.25rem;
  margin-right: -1.25rem;
  margin-bottom: 1rem;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain; /* ensures no cropping, maintains aspect ratio */
  max-height: none; /* allow full natural height */
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
}

/* Map overlay text */
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
  z-index: 1;
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

/* Responsive */
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