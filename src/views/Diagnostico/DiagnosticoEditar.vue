<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">{{ editar ? 'Editar diagnostico' : 'diagnostico' }}</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="actualizar()" class="formulario">
          <div class="form-group">
            <input
              type="text"
              placeholder="Número Documento"
              v-model="diagnostico.id_paciente"
              class="form-control"
              required
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <label for="select">Seleccione el Procedimiento:</label>
            <select
              id="select"
              class="form-select form-control"
              aria-label="Default select example"
              v-if="procedimientos.length > 0"
              v-model="diagnostico.id_procedimiento"
              :disabled="!editar"
            >
              <option
                :value="procedimiento.id_procedimiento"
                v-for="procedimiento in procedimientos"
                :key="procedimiento.id_procedimiento"
              >
                {{ procedimiento.nombre  }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <textarea
              rows="7"
              type="text"
              placeholder="Resultado"
              class="form-control"
              v-model="diagnostico.resultado"
              required
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <label for="select">Fecha:</label>
            <input
              type="date"
              class="form-control"
              v-model="diagnostico.fecha"
              required
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <textarea
              rows="7"
              type="text"
              placeholder="Observación"
              class="form-control"
              v-model="diagnostico.observacion"
              required
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
    diagnostico: Object,
    editar: Boolean
  },
  data() {
    return {
      procedimientos: [],
      diagnosticoIngresado: {},
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
    console.warn(this.diagnostico, 'diagnostico editar')
    this.verprocedimientos()
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .put("diagnostico/" + this.diagnostico.id_diagnostico, this.diagnostico, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R diagnostico");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje(respuesta.mensaje, "success");
            this.$router.push("/diagnostico");
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    cancelar () {
      this.$router.push('/diagnostico')
    },
    actualizarFoto () {
      const foto = document.getElementById('fileElem')
      foto.click()
      
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro fileReader
      reader.readAsDataURL(foto.files[0]);

      this.srcFoto = reader.result;
    },
        verprocedimientos() {
      this.axios
        .get("procedimiento", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta);
          this.procedimientos = respuesta.data;
        });
    },
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