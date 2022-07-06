<template>
  <div class="mt-5">
    <table class="table" id="tabla">
      <thead class="thead-light">
        <tr>
          <th scope="col">Identificación Paciente</th>
          <th scope="col">Nombre</th>
          <th scope="col">Ubicación Física</th>
          <th scope="col">Archivo</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="examen in examenes" :key="examen.codigo">
          <td>{{ examen.id_paciente }}</td>
          <td>{{ examen.nombre }}</td>
          <td>{{ examen.ubicacion_Fisica }}</td>
          <td>{{ examen.ubicacion_Digital }}</td>
          <td>{{ examen.fecha }}</td>
          <td>
            <button class="btn btn-outline-success" @click="ver(examen.ubicacion_Digital)">
              <span class="icon-Lupa"></span>
            </button>
            <!--
            <button
              class="btn btn-outline-warning ml-2"
              @click="editar(examen)"
            >
              <span class="icon-Lapiz"></span>
            </button>
            -->
            <button
              class="btn btn-outline-danger ml-2"
              @click="eliminar(examen)"
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
    examenes: [],
  },
  methods: {
    eliminar(examen) {
      this.$router.push({ name: "ExamenEliminar", params: { examen } });
    },
    editar(examen) {
      this.$router.push({
        name: "ExamenEditar",
        params: { examen, editar: true },
      });
    },
    ver(archivo) {
      window.open(
        this.axios.defaults.baseURL + "documentos/" + archivo
      );
    },
  },
};
</script>