<template>
  <div class="mt-5">
    <table class="table" id="tabla">
      <thead class="thead-light">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio $</th>
          <th scope="col">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="procedimiento in procedimientos" :key="procedimiento.codigo">
          <td>{{ procedimiento.nombre }}</td>
          <td>{{ procedimiento.precio }}</td>
          <td>{{ procedimiento.descripcion }}</td>
          <td>
            <button class="btn btn-outline-success" @click="ver(procedimiento)">
              <span class="icon-Lupa"></span>
            </button>
            <button class="btn btn-outline-warning ml-2" @click="editar(procedimiento)">
              <span class="icon-Lapiz"></span>
            </button>
            <button
              class="btn btn-outline-danger ml-2"
              @click="eliminar(procedimiento)"
            >
              <span class="icon-Papelera"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    procedimientos: [],
  },
  methods: {
    eliminar(procedimiento) {
      this.$router.push({ name: "ProcedimientoEliminar", params: { procedimiento } });
    },
    editar(procedimiento) {
      this.$router.push({ name: "ProcedimientoEditar", params: { procedimiento, editar: true } });
    },   
    ver(procedimiento) {
      this.$router.push({ name: "ProcedimientoEditar", params: { procedimiento, editar: false } });
    }
  },
};
</script>