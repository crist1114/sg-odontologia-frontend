<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">{{ editar ? 'Editar Paciente' : 'Paciente' }}</p>
    <img :src="srcFoto" alt="" class="foto" @click="actualizarFoto()">
    <input type="file" id="fileElem" accept="image/*" style="display:none" @onchange="actualizarFoto(this.files)">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="actualizar()" class="formulario">
          <div class="form-group">
            <input
              type="text"
              placeholder="Número Documento"
              v-model="paciente.nro_documento"
              class="form-control"
              disabled
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Nombres"
              class="form-control"
              v-model="paciente.nombre"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Apellidos"
              class="form-control"
              v-model="paciente.apellido"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <label for="select">Seleccione Fecha de Nacimiento:</label>
            <input
              type="date"
              class="form-control"
              v-model="paciente.fecha_nacimiento"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <label for="select">Seleccione Género:</label>
            <select
              id="select"
              class="form-select form-control"
              aria-label="Default select example"
              v-if="opcionesGenero.length > 0"
              v-model="paciente.genero"
              :disabled="!editar"
            >
              <option
                :value="opcionGenero.id"
                v-for="opcionGenero in opcionesGenero"
                :key="opcionGenero.id"
              >
                {{ opcionGenero.descripcion }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Email"
              class="form-control"
              v-model="paciente.email"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <input
              type="phone"
              placeholder="Numero de télefono"
              class="form-control"
              v-model="paciente.telefono"
              :disabled="!editar"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Dirección de residencia"
              class="form-control"
              v-model="paciente.direccion"
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
    paciente: Object,
    editar: Boolean
  },
  data() {
    return {
      pacienteIngresado: {},
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
    console.warn(this.paciente, 'Paciente editar')
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .put("paciente/" + this.paciente.nro_documento, this.paciente, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R pacientes");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje(respuesta.mensaje, "success");
            this.$router.push("/pacientes");
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    cancelar () {
      this.$router.push('/pacientes')
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