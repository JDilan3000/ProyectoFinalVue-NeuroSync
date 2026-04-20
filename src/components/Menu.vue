<template>
  <header class="navbar">
    <div class="logo">NeuroSync <span>Manager</span></div>
    <nav>
    <template v-if="logeado">
        <router-link to="/sujetos">Sujetos</router-link>
        <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
    </template>
    <template v-else>
        <router-link to="/">Inicio</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Registro</router-link>
    </template>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { isLogin, logout } from '@/services/authService';
import appMemory from '@/services/appMemory';

const logeado = ref(isLogin());

onMounted(() => {
  appMemory.subscribe('user', (v) => {
    logeado.value = !!v;
  });
});

const handleLogout = () => {
  logout();
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a2a3a;
  padding: 1rem 5%;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.logo span {
  color: #42b883;
}

nav {
  display: flex;
  gap: 20px; /* Esto separa los enlaces */
  align-items: center;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
}

nav a:hover {
  color: #42b883;
}

.btn-logout {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>