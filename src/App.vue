<script setup>
  import Menu from './components/Menu.vue';
</script>

<template>
  <Menu />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f0f2f5; /* Gris claro de fondo */
  color: #2c3e50;
}

.container {
  max-width: 1100px;
  margin: 40px auto;
}
</style>