<template>
  <div id="app">
    <DailyFocusJournal />
  </div>
</template>

<script setup>
import DailyFocusJournal from './components/DailyFocusJournal.vue';
</script>

<style>
/* Basic global styles */
body {
  margin: 0;
  background-color: var(--color-cream-warm); /* Latar belakang global sesuai estetika */
  font-family: 'Quicksand', sans-serif; /* Default font global */
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; /* Warna teks umum */
}
</style>