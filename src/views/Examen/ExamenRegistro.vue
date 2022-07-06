<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">Registro Examen:</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="" class="formulario">
          <div class="form-group">
            <input
              type="text"
              placeholder="Número Documento"
              v-model="examen.nro_documento"
              class="form-control"
              required
            />
            <button
              @click="verInfoPaciente()"
              class="btn btn-info form-control"
            >
              Buscar
            </button>
          </div>
          <div v-if="infoPaciente !== null">
            <h5 class="mb-5">Paciente: {{infoPaciente.nombre}} {{infoPaciente.apellido}}</h5>
            <div class="form-group">
              <input
                type="text"
                placeholder="Nombre del examen"
                class="form-control"
                v-model="examen.nombre"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Ubicación física"
                class="form-control"
                v-model="examen.ubicacion_Fisica"
                required
              />
            </div>
            <div class="form-group">
              <label for="select">Fecha:</label>
              <input
                type="date"
                class="form-control"
                v-model="examen.fecha"
                required
              />
            </div>
            <div class="form-group">
              <label for="file">Archivo (Ubicación Digital):</label>
              <input id="file" type="file" class="form-control" required />
              <button
                @click="subirArchivo()"
                class="btn btn-info form-control"
                v-if="nombreArchivo === ''"
              >
                Subir archivo
              </button>
              <button
                class="btn btn-danger form-control"
                @click="eliminarArchivo()"
                v-if="nombreArchivo !== ''"
              >
                Eliminar archivo
              </button>
            </div>
            <div class="form-group mt-5">
              <button @click="cancelar()" class="btn btn-info">Cancelar</button>
              <button @click="registro()" class="btn btn-success ml-5">
                Guardar
              </button>
            </div>
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
      examen: {},
      examenIngresado: {},
      mensaje: { ver: false },
      nombreArchivo: "",
      infoPaciente: null,
    };
  },
  methods: {
    cancelar() {
      this.$router.push("/examen");
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    registro() {
      this.examen.ubicacion_Digital = this.nombreArchivo;
      this.axios
        .post("examen", this.examen, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R examens");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje("Guardado correctamente", "success");
            this.$router.push("/examen");
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
    subirArchivo() {
      var formData = new FormData();
      var imagefile = document.querySelector("#file");
      formData.append("file", imagefile.files[0]);
      this.axios
        .post("subir", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((respuesta) => {
          console.log(respuesta);
          this.nombreArchivo = respuesta.data.filename;
        });
    },
    eliminarArchivo() {
      this.axios
        .delete("subir/" + this.nombreArchivo)
        .then((respuesta) => {
          console.log(respuesta);
          this.nombreArchivo = "";
        })
        .catch((error) => console.log(error));
    },
    verInfoPaciente() {
      if (this.examen.nro_documento !== undefined) {
        this.axios
          .get("paciente/" + this.examen.nro_documento, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((respuesta) => {
            console.log(respuesta, "respuesta info");
            if (respuesta.data.length > 0) {
              this.infoPaciente = respuesta.data[0];
            } else {
              this.infoPaciente = null;
              this.crearMensaje(respuesta.data.mensaje, "danger");
            }
          })
          .catch((error) => {
            this.crearMensaje(error.response.data.mensaje, "danger");
          });
      }
    },
  },
  components: {
    Mensaje,
  },
};
</script>