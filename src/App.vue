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
/* Estilos globales */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: #f4f7f6; }

.container {
  max-width: 1200px;
  margin: 25px auto;
  padding: 0 20px;
}
</style>