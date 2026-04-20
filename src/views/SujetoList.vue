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
/* Contenedor Principal */
.container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
}


.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 15px;
}

h2 {
  color: #1a2a3a;
  font-weight: 600;
  margin: 0;
}

h3 {
  color: #1a2a3a;
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
  margin-bottom: 5px;
}

/* Buscador y Filtros */
.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.search-input, .filter-select {
  padding: 10px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input { flex: 1; }
.search-input:focus, .filter-select:focus { border-color: #42b883; }

/* Tabla de Datos */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.data-table th {
  background-color: #f8f9fa;
  color: #606266;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #ebeef5;
}

.data-table td {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
  color: #2c3e50;
  vertical-align: middle;
}


.badge {
  background: #e1f3ff;
  color: #007aff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  min-width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
}

.form-group input, 
.form-group select, 
.form-group textarea {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background-color: #f8f9fa;
  font-size: 1rem;
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none;
  border-color: #42b883;
  background-color: #fff;
}

/* Botones */
button {
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-add { 
  background: #42b883; 
  color: white; 
  padding: 10px 20px; 
}

.btn-save { 
  background: #1a2a3a; 
  color: white; 
  padding: 12px; 
  margin-top: 10px;
  font-weight: bold;
}

.btn-save:hover { background: #42b883; }

.btn-view { background: #f0f2f5; color: #1a2a3a; margin-right: 5px; }
.btn-edit { background: #fff4e5; color: #d35400; margin-right: 5px; }
.btn-delete { background: #fff0f0; color: #c0392b; }

button:hover {
  filter: brightness(0.9);
  transform: translateY(-1px);
}
</style>