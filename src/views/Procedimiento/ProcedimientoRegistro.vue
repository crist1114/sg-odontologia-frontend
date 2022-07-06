<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">Registro procedimiento:</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="registro()" class="formulario">
          <div class="form-group">
            <input
              type="text"
              placeholder="Nombre"
              v-model="procedimiento.nombre"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="number"
              placeholder="Precio $"
              class="form-control"
              v-model="procedimiento.precio"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              rows="7"
              type="text"
              placeholder="Descripción"
              class="form-control"
              v-model="procedimiento.descripcion"
              required
            />
          </div>
          <div class="form-group">
            <button @click="cancelar()" class="btn btn-info">
              Cancelar
            </button>
            <button type="submit" class="btn btn-success ml-5">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/parciales/Mensaje.vue";
export default {
  data() {
    return {
      procedimiento: {},
      procedimientoIngresado: {},
      mensaje: { ver: false }
    };
  },
  methods: {
    cancelar() {
      this.$router.push("/procedimiento");
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    registro() {
      this.axios
        .post("procedimiento", this.procedimiento, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R procedimientos");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje("Guardado correctamente", "success");
            this.$router.push("/procedimiento");
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    verTiposDocumentos() {
      this.axios
        .get("tipo_documento", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta);
          this.tiposDocumentos = respuesta.data;
        });
    },
  },
  components: {
    Mensaje,
  },
};
</script>