<script setup>
// Solo un bloque de script
</script>

<template>
  <div class="home-hero">
    <h1>Bienvenido a NeuroSync Manager</h1>
    <p>Plataforma de gestión de señales neurofisiológicas y control de sujetos.</p>
    <div class="actions">
      <router-link to="/login" class="btn">Comenzar</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-hero { 
  text-align: center; 
  padding: 100px 20px; 
}
h1 { 
  font-size: 3rem; 
  color: #1a2a3a; 
  margin-bottom: 20px;
}
p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}
.btn { 
  background: #42b883; 
  color: white; 
  padding: 12px 24px; 
  text-decoration: none; 
  border-radius: 5px;
  font-weight: bold;
}
</style>