<template>
  <div class="mt-5">
    <table class="table" id="tabla">
      <thead class="thead-light">
        <tr>
          <th scope="col">Identificación Paciente</th>
          <th scope="col">Procedimiento</th>
          <th scope="col">Resultado</th>
          <th scope="col">Fecha</th>
          <th scope="col">Observación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="diagnostico in diagnosticos" :key="diagnostico.codigo">
          <td>{{ diagnostico.id_paciente }}</td>
          <td>{{ diagnostico.id_procedimiento }}</td>
          <td>{{ diagnostico.resultado }}</td>
          <td>{{ diagnostico.fecha }}</td>
          <td>{{ diagnostico.observacion }}</td>
          <td>
            <button class="btn btn-outline-success" @click="ver(diagnostico)">
              <span class="icon-Lupa"></span>
            </button>
            <button class="btn btn-outline-warning ml-2" @click="editar(diagnostico)">
              <span class="icon-Lapiz"></span>
            </button>
            <button
              class="btn btn-outline-danger ml-2"
              @click="eliminar(diagnostico)"
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
    diagnosticos: [],
  },
  methods: {
    eliminar(diagnostico) {
      this.$router.push({ name: "DiagnosticoEliminar", params: { diagnostico } });
    },
    editar(diagnostico) {
      this.$router.push({ name: "DiagnosticoEditar", params: { diagnostico, editar: true } });
    },   
    ver(diagnostico) {
      this.$router.push({ name: "Firma", params: { diagnostico, editar: false } });
    }
  },
};
</script>