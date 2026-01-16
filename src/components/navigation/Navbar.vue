<!-- src/components/navigation/Navbar.vue -->
<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-container">
      <!-- Logo -->
      <Logo @logo-click="handleLogoClick" />
      
      <!-- Desktop Navigation -->
      <DesktopNav 
        :nav-items="navItems" 
        :active-item="activeItem"
        @nav-click="handleNavClick"
      />
      
      <!-- Burger Menu Toggle -->
      <BurgerMenu 
        :is-open="isMobileOpen"
        @toggle="toggleMobileMenu"
      />
      
      <!-- Mobile Menu -->
      <MobileMenu 
        :is-open="isMobileOpen"
        :nav-items="navItems"
        :social-links="socialLinks"
        :active-item="activeItem"
        @close="closeMobileMenu"
        @nav-click="handleNavClick"
        @logo-click="handleLogoClick"
      />
      
      <!-- Decorative Elements -->
      <div class="navbar-decoration">
        <div class="nav-decoration-dots">
          <span class="decoration-dot" v-for="n in 3" :key="n"></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import BurgerMenu from './BurgerMenu.vue'
import DesktopNav from './DesktopNav.vue'
import Logo from './Logo.vue'
import MobileMenu from './MobileMenu.vue'
import { navItems, socialLinks } from './navigation.js'

// Reactive states
const isScrolled = ref(false)
const isMobileOpen = ref(false)
const activeItem = ref('home')

// Handle scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Handle navigation click
const handleNavClick = (itemId) => {
  activeItem.value = itemId
  console.log(`Navigating to: ${itemId}`)
  
  // Close mobile menu if open
  if (isMobileOpen.value) {
    closeMobileMenu()
  }
}

const handleLogoClick = () => {
  activeItem.value = 'home'
  console.log('Navigating to home')
  closeMobileMenu()
}

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
  updateBodyScroll()
}

const closeMobileMenu = () => {
  isMobileOpen.value = false
  updateBodyScroll()
}

const updateBodyScroll = () => {
  if (isMobileOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Navbar Base */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 1000;
  padding: 1.4rem 0 1rem 0;
  background: var(--white);;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Decorative Elements */
.navbar-decoration {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.nav-decoration-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(223, 172, 41, 0.3) 20%,
    rgba(223, 172, 41, 0.6) 50%,
    rgba(223, 172, 41, 0.3) 80%,
    transparent 100%
  );
}

.nav-decoration-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.decoration-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-gold-light);
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-decoration {
    display: none;
  }
}
</style>