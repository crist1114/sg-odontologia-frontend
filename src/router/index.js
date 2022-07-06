import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('@/views/LandingPage/LandingPageInicio.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('@/views/Menu/Index.vue'),
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: () => import('@/views/LandingPage/LandingPageNosotros.vue')
  },
  {
    path: '/inicio-sesion',
    name: 'InicioSesion',
    component: () => import('@/views/Usuario/UsuarioInicioSesion.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('@/views/Pacientes/PacienteRegistro.vue'),
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: () => import('@/views/Pacientes/Pacientes.vue'),
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/paciente-editar',
    name: 'PacienteEditar',
    component: () => import('@/views/Pacientes/PacienteEditar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/paciente-eliminar',
    name: 'PacienteEliminar',
    component: () => import('@/views/Pacientes/PacienteEliminar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/odontograma',
    name: 'Odontograma',
    component: () => import('@/views/Odontograma/Odontograma.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/odontograma-eliminar',
    name: 'OdontogramaEliminar',
    component: () => import('@/views/Odontograma/OdontogramaEliminar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: () => import('@/views/Agenda/Agenda.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/examen',
    name: 'Examen',
    component: () => import('@/views/Examen/Examen.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/examen-registro',
    name: 'ExamenRegistro',
    component: () => import('@/views/Examen/ExamenRegistro.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/examen-eliminar',
    name: 'ExamenEliminar',
    component: () => import('@/views/Examen/ExamenEliminar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/examen-editar',
    name: 'ExamenEditar',
    component: () => import('@/views/Examen/ExamenEditar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/procedimiento',
    name: 'Procedimiento',
    component: () => import('@/views/Procedimiento/Procedimiento.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/procedimiento-registro',
    name: 'ProcedimientoRegistro',
    component: () => import('@/views/Procedimiento/ProcedimientoRegistro.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/procedimiento-eliminar',
    name: 'ProcedimientoEliminar',
    component: () => import('@/views/Procedimiento/ProcedimientoEliminar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/procedimiento-editar',
    name: 'ProcedimientoEditar',
    component: () => import('@/views/Procedimiento/ProcedimientoEditar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/diagnostico',
    name: 'Diagnostico',
    component: () => import('@/views/Diagnostico/Diagnostico.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/diagnostico-registro',
    name: 'DiagnosticoRegistro',
    component: () => import('@/views/Diagnostico/DiagnosticoRegistro.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/diagnostico-eliminar',
    name: 'DiagnosticoEliminar',
    component: () => import('@/views/Diagnostico/DiagnosticoEliminar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/diagnostico-editar',
    name: 'DiagnosticoEditar',
    component: () => import('@/views/Diagnostico/DiagnosticoEditar.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/factura',
    name: 'Factura',
    component: () => import('@/views/Factura/Factura.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/factura-abono',
    name: 'FacturaAbono',
    component: () => import('@/views/Factura/FacturaActualizarSaldo.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/firma',
    name: 'Firma',
    component: () => import('@/views/Diagnostico/Firma.vue'),
    props: true,
    meta: { requiereAutorizacion: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiereAutorizacion);

  if (rutaProtegida && store.state.token === null) {
    next({ name: 'InicioSesion' })
  } else {
    next();
  }
})

export default router
