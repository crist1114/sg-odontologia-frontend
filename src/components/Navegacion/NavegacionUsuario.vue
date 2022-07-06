<template>
  <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
    <router-link
      data-toggle="collapse"
      data-target=".navbar-collapse.show"
      class="navbar-brand titulo"
      to="/"
      ><span class="text-dark">Consultorio</span> <br />
      <span class="color-verde-principal subtitulo-logo"
        >Claudia Hernandez</span
      ></router-link
    >

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="icon-Menu"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item ml-4">
          <router-link
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            to="/pacientes"
            class="text-dark"
            >Pacientes</router-link
          >
        </li>

        <li class="nav-item ml-4">
          <router-link
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            to="/agenda"
            class="text-dark"
            >Citas</router-link
          >
        </li>

        <li class="nav-item ml-4">
          <router-link
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            to="/examen"
            class="text-dark"
            >Examen</router-link
          >
        </li>

        <li class="nav-item ml-4">
          <router-link
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            to="/procedimiento"
            class="text-dark"
            >Procedimientos</router-link
          >
        </li>

        <li class="nav-item ml-4">
          <router-link
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            to="/diagnostico"
            class="text-dark"
            >Diagnósticos</router-link
          >
        </li>

        <li class="nav-item ml-4">
          <router-link
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            to="/factura"
            class="text-dark"
            >Facturas</router-link
          >
        </li>

        <li class="nav-item ml-4">
          <button
            @click="cerrarSesion"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            class="btn btn-outline-success"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>
<style scoped>
.numero-pedidos {
  background-color: #00a82d;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}
a {
  text-decoration: none;
}
</style>
