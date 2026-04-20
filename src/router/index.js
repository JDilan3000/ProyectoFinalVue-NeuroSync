import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SujetoList from '@/views/SujetoList.vue'
import SesionDetalle from '@/views/SesionDetalle.vue'
import { isLogin } from '@/services/authService';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/sujetos',
    name: 'sujetos',
    component: SujetoList,
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: '/sesion/:id', // Ruta dinámica para detalle
    name: 'sesionDetalle',
    component: SesionDetalle,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard de protección (Idéntico al de tu docente)
router.beforeEach((to, from, next) => {
  const auth = isLogin();
  if (to.path === '/login' && auth) {
    next('/sujetos'); // Si ya está logueado, mandarlo a los datos
  } else if (to.meta.requiresAuth && !auth) {
    next('/login'); // Si no está logueado, mandarlo al login
  } else {
    next();
  }
});

export default router;