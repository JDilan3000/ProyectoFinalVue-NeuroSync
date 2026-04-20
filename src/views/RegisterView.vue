<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Crear Cuenta</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="name" type="text" placeholder="Nombre completo" required />
        <input v-model="email" type="email" placeholder="Correo" required />
        <input v-model="password" type="password" placeholder="Contraseña (mín. 6)" required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { register } from '@/services/authService';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await register(name.value, email.value, password.value);
    router.push('/sujetos');
  } catch (e) { alert("Error al registrar"); }
};
</script>

<style scoped>
.auth-container { display: flex; justify-content: center; padding-top: 50px; }
.auth-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
button { width: 100%; background: #1a2a3a; color: white; border: none; padding: 10px; cursor: pointer; }
</style>