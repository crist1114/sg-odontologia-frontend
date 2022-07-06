<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">{{ editar ? 'Editar examen' : 'examen' }}</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="actualizar()" class="formulario">
          <div class="form-group">
            <input
              type="text"
              placeholder="Número Documento"
              v-model="examen.id_paciente"
              class="form-control"
              disabled
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Nombres"
              class="form-control"
              v-model="examen.nombre"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Apellidos"
              class="form-control"
              v-model="examen.descripcion"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <label for="select">Seleccione Fecha:</label>
            <input
              type="date"
              class="form-control"
              v-model="examen.fecha"
              :disabled="!editar"
            />
          </div>
          <div class="form-group" v-if="editar">
            <button @click="cancelar()" class="btn btn-info">Cancelar</button>
            <button type="submit" class="btn btn-success ml-5">Actualizar</button>
          </div>
          <button @click="cancelar()" class="btn btn-info" v-if="!editar">Regresar</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/parciales/Mensaje.vue";
export default {
  props: {
    examen: Object,
    editar: Boolean
  },
  data() {
    return {
      examenIngresado: {},
      mensaje: { ver: false },
      tiposDocumentos: [{ id: 1, nombre: "Cédula" }],
      opcionesGenero: [
        { id: 1, descripcion: "Hombre" },
        { id: 2, descripcion: "Mujer" },
      ],
      inputFoto: '',
      srcFoto: 'https://www.coordinadora.com/wp-content/uploads/sidebar_usuario-corporativo.png'
    };
  },
  created () {
    console.warn(this.examen, 'examen editar')
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .put("examen/" + this.examen.id_examen, this.examen, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R examen");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje(respuesta.mensaje, "success");
            this.$router.push("/examen");
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    cancelar () {
      this.$router.push('/examen')
    },
    actualizarFoto () {
      const foto = document.getElementById('fileElem')
      foto.click()
      
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro fileReader
      reader.readAsDataURL(foto.files[0]);

      this.srcFoto = reader.result;
    }
  },
  components: {
    Mensaje,
  },
};
</script>
<style scoped>
.foto {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>