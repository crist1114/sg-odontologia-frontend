<template>
  <div class="mt-5">
    <table class="table" id="tabla">
      <thead class="thead-light">
        <tr>
          <th scope="col">factura</th>
          <th scope="col">Diagnostico</th>
          <th scope="col">Identificación Paciente</th>
          <th scope="col">Valor Total</th>
          <th scope="col">Abono</th>
          <th scope="col">Saldo</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="factura in facturas" :key="factura.codigo">
          <td>{{ factura.id_factura }}</td>
          <td>{{ factura.id_diagnostico }}</td>
          <td>{{ factura.id_paciente }}</td>
          <td>{{ factura.valor_total }}</td>
          <td>{{ factura.abono }}</td>
          <td>{{ factura.saldo }}</td>
          <td>{{ factura.fecha }}</td>
          <td>
            <button class="btn btn-outline-warning ml-2" @click="actualizarSaldo(factura)">
              <span class="icon-Lapiz"></span>
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
    facturas: [],
  },
  methods: {
    actualizarSaldo(factura) {
      this.$router.push({ name: "FacturaAbono", params: { factura, editar: true } });
    }
  },
};
</script>