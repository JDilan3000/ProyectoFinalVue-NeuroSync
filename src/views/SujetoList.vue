<template>
  <div class="container">
    <div class="header-actions">
      <h2>Panel de Sujetos Neurofisiológicos</h2>
      <button @click="openModal(null)" class="btn-add">+ Nuevo Sujeto</button>
    </div>

    <div class="filters">
      <input v-model="searchQuery" @input="fetchSujetos" placeholder="Buscar por nombre..." class="search-input" />
      <select v-model="filterCondicion" @change="fetchSujetos" class="filter-select">
        <option value="">Todas las condiciones</option>
        <option value="Control">Control</option>
        <option value="Paciente">Paciente</option>
      </select>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Condición</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sujeto in sujetos" :key="sujeto.id">
          <td>{{ sujeto.id }}</td>
          <td>{{ sujeto.nombre }}</td>
          <td>{{ sujeto.edad }}</td>
          <td><span class="badge">{{ sujeto.condicion }}</span></td>
          <td>
            <button @click="goToDetails(sujeto.id)" class="btn-view">Sesiones</button>
            <button @click="openModal(sujeto)" class="btn-edit">Editar</button>
            <button @click="handleDelete(sujeto.id)" class="btn-delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <BaseModal v-model="showModal">
      <h3>{{ isEditing ? 'Editar Sujeto' : 'Nuevo Sujeto' }}</h3>
      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label>Nombre Completo</label>
          <input v-model="formSujeto.nombre" type="text" required />
        </div>
        <div class="form-group">
          <label>Edad</label>
          <input v-model.number="formSujeto.edad" type="number" required />
        </div>
        <div class="form-group">
          <label>Condición</label>
          <select v-model="formSujeto.condicion" required>
            <option value="Control">Control</option>
            <option value="Paciente">Paciente</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notas Adicionales</label>
          <textarea v-model="formSujeto.notas"></textarea>
        </div>
        <button type="submit" class="btn-save">
          {{ isEditing ? 'Guardar Cambios' : 'Registrar Sujeto' }}
        </button>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getSujetos, deleteSujeto, createSujeto, updateSujeto } from '@/services/sujetoService';
import BaseModal from '@/components/BaseModal.vue';

const sujetos = ref([]);
const searchQuery = ref('');
const filterCondicion = ref('');
const router = useRouter();

// Lógica del Modal y Formulario
const showModal = ref(false);
const isEditing = ref(false);
const formSujeto = ref({ nombre: '', edad: '', condicion: 'Control', notas: '' });
const editingId = ref(null);

const fetchSujetos = async () => {
  const res = await getSujetos(searchQuery.value);
  let data = res.data;
  if (filterCondicion.value) {
    data = data.filter(s => s.condicion === filterCondicion.value);
  }
  sujetos.value = data;
};

const openModal = (sujeto = null) => {
  if (sujeto) {
    isEditing.value = true;
    editingId.value = sujeto.id;
    formSujeto.value = { ...sujeto };
  } else {
    isEditing.value = false;
    formSujeto.value = { nombre: '', edad: '', condicion: 'Control', notas: '' };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateSujeto(editingId.value, formSujeto.value);
    } else {
      await createSujeto(formSujeto.value);
    }
    showModal.value = false;
    fetchSujetos();
  } catch (e) {
    alert("Error al guardar");
  }
};

const handleDelete = async (id) => {
  if (confirm('¿Eliminar sujeto?')) {
    await deleteSujeto(id);
    fetchSujetos();
  }
};

const goToDetails = (id) => router.push(`/sesion/${id}`);

onMounted(fetchSujetos);
</script>

<style scoped>

.modal-form { display: flex; flex-direction: column; gap: 15px; margin-top: 15px; min-width: 350px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group input, .form-group select, .form-group textarea { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
.btn-save { background: #1a2a3a; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.btn-save:hover { background: #42b883; }
</style>