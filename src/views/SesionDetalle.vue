<template>
  <div class="container">
    <div class="header-nav">
      <button @click="router.back()" class="btn-back">← Volver a Sujetos</button>
      <div class="title-group">
        <h2>Registro de Sesiones</h2>
        <p class="subtitle">Sujeto ID: {{ id }}</p>
      </div>
      <button @click="openModal" class="btn-add">+ Nueva Sesión</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Tipo de Prueba</th>
            <th>Dispositivo</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sesion in sesiones" :key="sesion.id">
            <td><strong>{{ sesion.tipo }}</strong></td>
            <td>{{ sesion.dispositivo }}</td>
            <td>{{ sesion.fecha }}</td>
            <td>{{ sesion.observaciones }}</td>
            <td>
              <button @click="handleDelete(sesion.id)" class="btn-delete">Eliminar</button>
            </td>
          </tr>
          <tr v-if="sesiones.length === 0">
            <td colspan="5" class="empty-state">No hay sesiones registradas para este sujeto.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal v-model="showModal">
      <h3>Registrar Nueva Sesión BCI</h3>
      <form @submit.prevent="saveSesion" class="modal-form">
        <div class="form-group">
          <label>Tipo de Señal / Paradigma</label>
          <input v-model="nuevaSesion.tipo" placeholder="Ej: EEG-SSVEP, IM, P300" required />
        </div>
        <div class="form-group">
          <label>Hardware Utilizado</label>
          <input v-model="nuevaSesion.dispositivo" placeholder="Ej: OpenBCI, Emotiv" required />
        </div>
        <div class="form-group">
          <label>Fecha del Experimento</label>
          <input v-model="nuevaSesion.fecha" type="date" required />
        </div>
        <div class="form-group">
          <label>Observaciones Técnicas</label>
          <textarea v-model="nuevaSesion.observaciones" placeholder="Filtros, impedancia, etc."></textarea>
        </div>
        <button type="submit" class="btn-save">Guardar Sesión</button>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getSesionesBySujeto, createSesion, deleteSesion } from '@/services/sesionService';
import BaseModal from '@/components/BaseModal.vue';

const props = defineProps(['id']); // Recibe el ID de la URL
const router = useRouter();
const sesiones = ref([]);
const showModal = ref(false);

const nuevaSesion = ref({
  sujetoId: parseInt(props.id),
  tipo: '',
  dispositivo: '',
  fecha: new Date().toISOString().substr(0, 10),
  observaciones: ''
});

const loadSesiones = async () => {
  try {
    const res = await getSesionesBySujeto(props.id);
    sesiones.value = res.data;
  } catch (e) {
    console.error("Error cargando sesiones");
  }
};

const sujetoIdNumerico = parseInt(props.id);
const openModal = () => {
  nuevaSesion.value = {
    sujetoId: sujetoIdNumerico,
    tipo: '',
    dispositivo: '',
    fecha: new Date().toISOString().substr(0, 10),
    observaciones: ''
  };
  showModal.value = true;
};

const saveSesion = async () => {
  try {
    await createSesion(nuevaSesion.value); 
    
    showModal.value = false;
    loadSesiones(); // Recargar la tabla
  } catch (e) {
    console.error("Error al guardar la sesión:", e);
    alert("No se pudo guardar la sesión en el servidor.");
  }
};

const handleDelete = async (sesionId) => {
  if (confirm("¿Eliminar registro de sesión?")) {
    await deleteSesion(sesionId);
    loadSesiones();
  }
};

onMounted(loadSesiones);
</script>

<style scoped>
.container { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

.header-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; gap: 20px; }

.btn-back { background: #f0f2f5; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; color: #1a2a3a; font-weight: bold; }

.title-group h2 { margin: 0; color: #1a2a3a; }
.subtitle { margin: 0; color: #42b883; font-weight: bold; font-size: 0.9rem; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 12px; border-bottom: 2px solid #f0f2f5; color: #666; font-size: 0.8rem; text-transform: uppercase; }
.data-table td { padding: 15px; border-bottom: 1px solid #f0f2f5; font-size: 0.95rem; }

.empty-state { text-align: center; color: #999; padding: 40px !important; font-style: italic; }


.modal-form { display: flex; flex-direction: column; gap: 15px; min-width: 380px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 0.75rem; font-weight: bold; color: #1a2a3a; text-transform: uppercase; }
.form-group input, .form-group textarea { padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: #f9f9f9; }
.btn-save { background: #1a2a3a; color: white; padding: 12px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
.btn-save:hover { background: #42b883; }
.btn-add { background: #42b883; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-delete { background: #fff0f0; color: #c0392b; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }

.modal-form {
  min-width: 100%; 
  padding: 10px;
}

.form-group input, 
.form-group textarea {
  width: 100%; 
  box-sizing: border-box; 
}
</style>