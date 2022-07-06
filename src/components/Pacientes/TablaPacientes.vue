<template>
  <div class="mt-5">
    <table class="table" id="tabla">
      <thead class="thead-light">
        <tr>
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Dirección</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Email</th>
          <th scope="col">Genero</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.codigo">
          <td>{{ paciente.nombre }}</td>
          <td>{{ paciente.apellido }}</td>
          <td>{{ paciente.direccion }}</td>
          <td>{{ paciente.telefono }}</td>
          <td>{{ paciente.email }}</td>
          <td>{{ paciente.genero === 1 ? "M" : "H" }}</td>
          <td>
            <button class="btn btn-outline-success" @click="verOdontograma(paciente)">
              <span class="icon-Lupa"></span>
            </button>
            <button
              class="btn btn-outline-warning ml-2"
              @click="editar(paciente)"
            >
              <span class="icon-Lapiz"></span>
            </button>
            <button
              class="btn btn-outline-danger ml-2"
              @click="eliminar(paciente)"
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
    pacientes: [],
  },
  methods: {
    eliminar(paciente) {
      this.$router.push({ name: "PacienteEliminar", params: { paciente } });
    },
    editar(paciente) {
      this.$router.push({
        name: "PacienteEditar",
        params: { paciente, editar: true },
      });
    },
    ver(paciente) {
      this.$router.push({
        name: "PacienteEditar",
        params: { paciente, editar: false },
      });
    },
    verOdontograma(paciente) {
      this.$router.push({
        name: "Odontograma",
        params: { paciente, editar: true },
      });
    },
  },
};
</script>