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

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; 
  padding: 20px;
}

/* La tarjeta del formulario */
.auth-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1); 
  width: 100%;
  max-width: 450px; 
  text-align: center;
}

h2 {
  color: #1a2a3a;
  margin-bottom: 10px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 0.95rem;
}


.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left; /* Etiquetas alineadas a la izquierda */
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}


input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background-color: #f8f9fa;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box; 
}

input:focus {
  outline: none;
  border-color: #42b883;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}


.btn-register {
  width: 100%;
  background-color: #1a2a3a;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #2c3e50;
}


.auth-footer {
  margin-top: 25px;
  font-size: 0.9rem;
  color: #666;
}

.auth-footer a {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
}
</style>