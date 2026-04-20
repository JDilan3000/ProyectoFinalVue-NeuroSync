<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Iniciar Sesión</h2>
      <p>Acceso al panel de control NeuroSync</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Correo Electrónico</label>
          <input v-model="email" type="email" placeholder="ejemplo@u.bo" />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="••••••••" />
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>

        <button :disabled="loading" class="btn-primary">
          {{ loading ? 'Verificando...' : 'Entrar' }}
        </button>

        <p v-if="errorGeneral" class="error-box">{{ errorGeneral }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/authService';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorGeneral = ref('');
const errors = ref({ email: '', password: '' });

const validate = () => {
  let isValid = true;
  errors.value = { email: '', password: '' };

  if (!email.value) {
    errors.value.email = 'El email es requerido';
    isValid = false;
  }
  if (password.value.length < 6) {
    errors.value.password = 'Mínimo 6 caracteres';
    isValid = false;
  }
  return isValid;
};

const handleLogin = async () => {
  if (!validate()) return;
  
  errorGeneral.value = '';
  loading.value = true;
  try {
    await login(email.value, password.value);
    router.push('/sujetos'); // Redirigir tras éxito
  } catch (err) {
    errorGeneral.value = 'Credenciales inválidas. Revise su conexión.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container { display: flex; justify-content: center; margin-top: 50px; }
.auth-card { background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); width: 100%; max-width: 400px; }
h2 { margin-bottom: 0.5rem; color: #1a2a3a; }
p { margin-bottom: 2rem; color: #666; font-size: 0.9rem; }

.form-group { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.85rem; }
input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; outline: none; }
input:focus { border-color: #42b883; }

.btn-primary { width: 100%; padding: 12px; background: #1a2a3a; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.btn-primary:hover { background: #2c3e50; }
.btn-primary:disabled { background: #ccc; }

.error-text { color: #ff4d4d; font-size: 0.75rem; display: block; margin-top: 4px; }
.error-box { background: #ffe6e6; color: #cc0000; padding: 10px; border-radius: 4px; margin-top: 1rem; text-align: center; font-size: 0.85rem; }
</style>