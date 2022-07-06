<template>
  <div class="text-center">
    <h4>Actualizar Saldo</h4>
    <h5>Total saldo: $ {{ factura.saldo }}</h5>
    <div class="row">
    <div class="form-group">
        <input
          type="number"
          placeholder="Saldo"
          class="form-control"
          v-model="abono"
          required
        />
      </div>
      <div class="col-md-6">
        <button class="btn btn-danger" @click="actualizarSaldo()">Agregar Abono</button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-info" @click="cancelar">Cancelar</button>
      </div>
    </div>
    <Mensaje :mensaje="mensaje" />
  </div>
</template>
<script>
import Mensaje from "@/components/parciales/Mensaje.vue";
export default {
  data() {
    return {
      mensaje: { ver: false },
      abono: 0
    };
  },
  props: {
    factura: Object,
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    cancelar() {
      this.$router.push({ name: "Factura" });
    },
    actualizarSaldo() {
      const nuevoSaldo = this.factura.saldo - this.abono
      this.axios
        .put("factura/" + this.factura.id_factura + "/" + nuevoSaldo, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push({ name: "Factura" });
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
  },
  components: {
    Mensaje,
  },
};
</script>