<template>
  <div class="text-center">
    <h4>¿Desea eliminar a {{ odontograma.descripcion }} ?</h4>
    <div class="row">
      <div class="col-md-6">
        <button class="btn btn-danger" @click="eliminar()">Eliminar</button>
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
    };
  },
  props: {
    odontograma: Object,
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    cancelar() {
      this.$router.push({ name: "odontogramas" });
    },
    eliminar() {
      this.axios
        .delete("odontograma/" + this.odontograma.id_odontograma, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          if (respuesta.status === 200) {
            const paciente = {
              nro_documento: this.odontograma.id_paciente
            }
            this.$router.push({
              name: "Odontograma",
              params: { paciente, editar: true },
            });
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