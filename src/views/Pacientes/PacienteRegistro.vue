<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">Registro Paciente</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="registro()" class="formulario">
          <div class="form-group">
            <label for="select">Seleccione Tipo Documento:</label>
            <select
              id="select"
              class="form-select form-control"
              aria-label="Default select example"
              v-if="tiposDocumentos.length > 0"
              v-model="paciente.id_tipo_documento"
            >
              <option
                :value="tipoDocumento.id_tipo_documento"
                v-for="tipoDocumento in tiposDocumentos"
                :key="tipoDocumento.id"
              >
                {{ tipoDocumento.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Número Documento"
              v-model="paciente.nro_documento"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Nombres"
              class="form-control"
              v-model="paciente.nombre"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Apellidos"
              class="form-control"
              v-model="paciente.apellido"
              required
            />
          </div>
          <div class="form-group">
            <label for="select">Seleccione Fecha de Nacimiento:</label>
            <input
              type="date"
              class="form-control"
              v-model="paciente.fecha_nacimiento"
              required
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
              required
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
              required
            />
          </div>
          <div class="form-group">
            <input
              type="phone"
              placeholder="Numero de télefono"
              class="form-control"
              v-model="paciente.telefono"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Dirección de residencia"
              class="form-control"
              v-model="paciente.direccion"
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
      paciente: {
        id_tipo_documento: 1,
        genero: "H",
        estado: 0,
        tipoDocumento: { id_tipo_documento: 1, nombre: "Cedula" },
      },
      pacienteIngresado: {},
      mensaje: { ver: false },
      tiposDocumentos: [{ id_tipo_documento: 1, nombre: "Cédula" }],
      opcionesGenero: [
        { id: 1, descripcion: "Hombre" },
        { id: 2, descripcion: "Mujer" },
      ],
    };
  },
  created() {
    this.verTiposDocumentos();
  },
  methods: {
    cancelar() {
      this.$router.push("/pacientes");
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    registro() {
      this.axios
        .post("paciente", this.paciente, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R pacientes");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje("Guardado correctamente", "success");
            this.$router.push("/pacientes");
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